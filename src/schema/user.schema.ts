import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserOutputScheam = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type CreateUserImput = z.TypeOf<typeof createUserSchema>;

export const requestOtpSchema = z.object({
  email: z.string().email(),
  redirect: z.string().optional(),
});

export type RequestOtpSchema = z.TypeOf<typeof requestOtpSchema>;

export const verifyOtpSchema = z.object({
  hash: z.string(),
});
