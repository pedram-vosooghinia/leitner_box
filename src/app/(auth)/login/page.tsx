"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { loginServices } from "@/services/auth";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoginFormInputs } from "@/types/login";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema";
import { AxiosError } from "axios";
export default function Login() {
  const { addToUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleLogin = async (values: LoginFormInputs) => {
    setIsSubmitting(true);
    try {
      const loginRes = await loginServices(values);
      const userData = loginRes.data.user;
      addToUser(userData);
      Cookies.set("user", JSON.stringify(userData), {
        expires: 1,
        sameSite: "strict",
      });

      if (loginRes.status == 200) {
        toast.success("شما با موفقیت وارد شدید");
      }

      router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError;
      const message =
        (err.response?.data as { message?: string })?.message ||
        "خطایی رخ داده است";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className=" mx-auto grid w-[350px] gap-6 py-12">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="mobile">موبایل</Label>
          <Input
            placeholder="09123456789"
            {...register("mobile")}
            type="text"
            className=" rtl"
            id="mobile"
            autoComplete="username"
          />

          {errors.mobile && (
            <div className="text-red-500">{errors.mobile.message}</div>
          )}
        </div>
        <div className="flex justify-between items-end gap-2 ">
          <div className=" w-full ">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="!@#$%^&*"
              autoComplete="current-password"
              autoFocus
            />
          </div>

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="mb-2"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
        <Button
          type="submit"
          className={`  ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm gap-2 flex justify-center ">
        <div>آیا هنوز ثبت نام نکرده اید؟</div>
        <Link href="/signin" className="underline">
          ثبت نام
        </Link>
      </div>
    </div>
  );
}
