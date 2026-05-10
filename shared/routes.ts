import { z } from "zod";
import { analysisResultSchema } from "./schema";

export const api = {
  analyze: {
    submit: {
      method: "POST" as const,
      path: "/api/analyze",
      input: z.any(), 
      responses: {
        200: analysisResultSchema,
        400: z.object({ message: z.string() }),
      },
    },
  },
  generate: {
    resume: {
      method: "POST" as const,
      path: "/api/generate-resume",
      input: z.object({
        analysis: analysisResultSchema,
      }),
      responses: {
        200: z.object({ content: z.string() }),
        400: z.object({ message: z.string() }),
        500: z.object({ message: z.string() }),
      },
    },
  },
};
