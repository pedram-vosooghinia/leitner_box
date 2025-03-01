import { z } from "zod";

export const loginSchema = z.object({
  mobile: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
