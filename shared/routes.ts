import { z } from "zod";
import { analysisResultSchema } from "./schema";

export const api = {
  analyze: {
    submit: {
      method: "POST" as const,
      path: "/api/analyze",
      // Input is FormData, but for type safety we can define what we expect in the body if we weren't using FormData. 
      // For file uploads, strictly speaking, the body is FormData. 
      // We'll define an empty object for now as the file handling is done via multer/busboy on backend 
      // and FormData on frontend.
      input: z.any(), 
      responses: {
        200: analysisResultSchema,
        400: z.object({ message: z.string() }),
      },
    },
  },
};
