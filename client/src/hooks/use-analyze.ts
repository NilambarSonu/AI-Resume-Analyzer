import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Since the input is strictly FormData on the client side for file uploads,
// we define a helper type here, even though the schema might say z.any().
type AnalyzeInput = FormData;

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export function useAnalyzeResume() {
  return useMutation({
    mutationFn: async (formData: AnalyzeInput) => {
      const res = await fetch(`${API_BASE_URL}${api.analyze.submit.path}`, {
        method: api.analyze.submit.method,
        body: formData,
        // Content-Type header is set automatically by browser for FormData
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Analysis failed");
      }

      // Parse response with Zod schema
      return api.analyze.submit.responses[200].parse(await res.json());
    },
  });
}
