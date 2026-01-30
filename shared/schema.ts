import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
});

// Schema for the Analysis Result (matching the user's mock structure)
export const chartDataSchema = z.object({
  subject: z.string(),
  A: z.number(),
  B: z.number(),
  fullMark: z.number(),
});

export const analysisResultSchema = z.object({
  score: z.number(),
  matches: z.array(z.string()),
  missing: z.array(z.string()),
  chart_data: z.array(chartDataSchema),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;
export type ChartData = z.infer<typeof chartDataSchema>;
