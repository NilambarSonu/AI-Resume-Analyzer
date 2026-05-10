import type { Express } from "express";
import type { Server } from "http";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import Groq from "groq-sdk";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const upload = multer({ storage: multer.memoryStorage() });

const SYSTEM_PROMPT = `
You are the AI Career Architect. Analyze the resume against the job description with surgical precision and black-tie elegance.
You MUST return ONLY a valid JSON object. Do not include markdown formatting or extra text.

The JSON must EXACTLY match this structure:
{
  "match_score": <integer 0-100>,
  "detected_skills": ["skill1", "skill2"],
  "missing_keywords": ["skill3", "skill4"],
  "chart_data": [
    {"subject": "Coding", "A": <int 0-150>, "B": <int 0-150>, "fullMark": 150},
    {"subject": "Teamwork", "A": <int>, "B": <int>, "fullMark": 150},
    {"subject": "Problem Solving", "A": <int>, "B": <int>, "fullMark": 150},
    {"subject": "Design", "A": <int>, "B": <int>, "fullMark": 150},
    {"subject": "Communication", "A": <int>, "B": <int>, "fullMark": 150},
    {"subject": "Leadership", "A": <int>, "B": <int>, "fullMark": 150}
  ],
  "action_plan": [
    {"title": "Step 1", "description": "Details..."}
  ]
}
Note: 'A' is the candidate's skill level, 'B' is the job requirement level.
`;

let groq: Groq;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Initialize Groq client inside registerRoutes so env vars are ready
  const apiKey = (process.env.GROQ_API_KEY || "").trim();
  groq = new Groq({ apiKey });
  
  console.log(`[Groq] Initialized with key prefix: ${apiKey.substring(0, 10)}...`);

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post(api.analyze.submit.path, upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No PDF file uploaded" });
      }

      const jobDescription = req.body.jobDescription || "General Software Engineer role";

      const parser = new PDFParse({ data: req.file.buffer });
      const pdfData = await parser.getText();
      await parser.destroy();
      const resumeText = pdfData.text;

      const userPrompt = `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME:\n${resumeText}`;

      // Call the Groq API
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.0,
        response_format: { type: "json_object" }
      });

      const responseText = chatCompletion.choices[0]?.message?.content || "{}";
      const parsedJson = JSON.parse(responseText);
      
      // In case the LLM returned match_score instead of score (as per user's prompt vs actual schema)
      if (parsedJson.match_score !== undefined && parsedJson.score === undefined) parsedJson.score = parsedJson.match_score;
      if (parsedJson.detected_skills !== undefined && parsedJson.matches === undefined) parsedJson.matches = parsedJson.detected_skills;
      if (parsedJson.missing_keywords !== undefined && parsedJson.missing === undefined) parsedJson.missing = parsedJson.missing_keywords;

      res.json(parsedJson);

    } catch (error: any) {
      console.error("LLM Analysis Error:", error);
      const message = error?.error?.error?.message || error.message || "Failed to analyze resume";
      res.status(500).json({ message });
    }
  });

  app.post(api.generate.resume.path, async (req, res) => {
    try {
      const { analysis } = api.generate.resume.input.parse(req.body);

      const generatePrompt = `
        As the AI Career Architect, create an OPTIMIZED RESUME version based on this analysis:
        MATCH SCORE: ${analysis.score}%
        DETECTED SKILLS: ${analysis.matches.join(", ")}
        MISSING KEYWORDS: ${analysis.missing.join(", ")}
        
        Provide the resume in a clean, professional MARKDOWN format. 
        Focus on integrating the missing keywords naturally into experience bullets.
        Use black-tie elegance in tone and formatting.
      `;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are the AI Career Architect. You output high-end, optimized professional resumes." },
          { role: "user", content: generatePrompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.2,
      });

      const content = chatCompletion.choices[0]?.message?.content || "Failed to generate resume content.";
      res.json({ content });

    } catch (error: any) {
      console.error("LLM Generation Error:", error);
      const message = error?.error?.error?.message || error.message || "Failed to generate resume";
      res.status(500).json({ message });
    }
  });

  return httpServer;
}
