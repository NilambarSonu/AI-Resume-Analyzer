import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Mock Data
  const MOCK_RESULT = {
    score: 78,
    matches: ["Python", "FastAPI", "React"],
    missing: ["Docker", "Kubernetes", "Redis"],
    chart_data: [
       { subject: "Coding", A: 120, B: 110, fullMark: 150 },
       { subject: "Design", A: 98, B: 130, fullMark: 150 },
       { subject: "Communication", A: 86, B: 130, fullMark: 150 },
       { subject: "Leadership", A: 99, B: 100, fullMark: 150 },
       { subject: "Problem Solving", A: 85, B: 90, fullMark: 150 },
       { subject: "Teamwork", A: 65, B: 85, fullMark: 150 }
    ]
  };

  app.post(api.analyze.submit.path, async (req, res) => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock data
    res.json(MOCK_RESULT);
  });

  return httpServer;
}
