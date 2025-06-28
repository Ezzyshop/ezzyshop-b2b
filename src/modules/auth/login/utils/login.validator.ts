import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(11, "Phone number is required"),
  password: z.string().min(8, "Password is required"),
});
