import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  PAYTR_MERCHANT_ID: z.string().optional(),
  PAYTR_MERCHANT_KEY: z.string().optional(),
  PAYTR_MERCHANT_SALT: z.string().optional(),
  PAYTR_TEST_MODE: z.string().optional(),

  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  PARASUT_CLIENT_ID: z.string().optional(),
  PARASUT_CLIENT_SECRET: z.string().optional(),
  PARASUT_COMPANY_ID: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

  PAYTR_MERCHANT_ID: process.env.PAYTR_MERCHANT_ID,
  PAYTR_MERCHANT_KEY: process.env.PAYTR_MERCHANT_KEY,
  PAYTR_MERCHANT_SALT: process.env.PAYTR_MERCHANT_SALT,
  PAYTR_TEST_MODE: process.env.PAYTR_TEST_MODE,

  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,

  PARASUT_CLIENT_ID: process.env.PARASUT_CLIENT_ID,
  PARASUT_CLIENT_SECRET: process.env.PARASUT_CLIENT_SECRET,
  PARASUT_COMPANY_ID: process.env.PARASUT_COMPANY_ID,
});
