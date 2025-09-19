import { z } from 'zod';

export const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_APP_NAME: z.string(),
  VITE_APP_PORT: z.number(),
});

export const env = envSchema.parse(import.meta.env);
