import { z } from "zod";

export const signInSchema = z.object({
  firstName: z.string().min(1, "نام الزامی است"),
  lastName: z.string().min(1, "نام خانوادگی الزامی است"),
  mobile: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد")
    .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد")
    .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد")
    .regex(/[\W_]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد"),
});

export type SignInFormInputs = z.infer<typeof signInSchema>;
