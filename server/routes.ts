import type { Express } from "express";
import type { Server } from "http";
import multer from "multer";
import pdfParse from "pdf-parse";
import Groq from "groq-sdk";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const upload = multer({ storage: multer.memoryStorage() });

// Initialize the Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

const SYSTEM_PROMPT = `
You are an expert AI technical recruiter. Analyze the resume against the job description.
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

const FALLBACK_MOCK_JSON = {
  score: 0,
  matches: ["Error processing"],
  missing: ["API Failure"],
  chart_data: [
    { subject: "Error", A: 0, B: 0, fullMark: 150 }
  ]
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.post(api.analyze.submit.path, upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No PDF file uploaded" });
      }

      const jobDescription = req.body.jobDescription || "General Software Engineer role";
      
      const pdfData = await pdfParse(req.file.buffer);
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

    } catch (error) {
      console.error("LLM Analysis Error:", error);
      res.json(FALLBACK_MOCK_JSON);
    }
  });

  return httpServer;
}
