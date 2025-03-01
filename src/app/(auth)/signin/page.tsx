"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signInServices } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { SignInFormInputs } from "@/types/signin";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";
import { signInSchema } from "@/validation/signinSchema";
import { AxiosError } from "axios";
export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const signInHandler = async (values: SignInFormInputs) => {
    try {
      const res = await signInServices(values);
      if (res.status == 201) {
        toast.success(
          "ثبت نام با موفقیت انجام شد لطفا منتظر تایید ادمین باشید"
        );
      }
    } catch (error) {
      const err = error as AxiosError;
      const message =
        (err.response?.data as { message?: string })?.message ||
        "خطایی رخ داده است";
      toast.error(message);
    } finally {
      reset()
    }
  };

  return (
    <>
      <div className=" mx-auto grid w-[350px] gap-6 py-12">
        <h1 className="text-3xl font-bold text-center">SignIn</h1>

        <form className="grid gap-4" onSubmit={handleSubmit(signInHandler)}>
          <div className="grid gap-2">
            <Label htmlFor="firstName">نام</Label>

            <Input
              {...register("firstName", { required: true })}
              type="text"
              id="firstName"
              placeholder="نام"
              autoComplete="firstName"
              autoFocus
            />
            {errors.firstName && (
              <div className="text-red-500">{errors.firstName.message}</div>
            )}

            <Label htmlFor="lastName">نام خانوادگی</Label>

            <Input
              {...register("lastName", { required: true })}
              type="text"
              id="lastName"
              placeholder="نام خانوادگی"
              autoComplete="lastName"
              autoFocus
            />
            {errors.lastName && (
              <div className="text-red-500">{errors.lastName.message}</div>
            )}

            <Label htmlFor="mobile">شماره موبایل</Label>
            <Input
              {...register("mobile", { required: "شماره موبایل الزامی است" })}
              type="text"
              id="mobile"
              autoComplete="tel"
              placeholder="09123456789"
            />
            {errors.mobile && (
              <div className="text-red-500">{errors.mobile.message}</div>
            )}

            <div className="flex justify-between items-end gap-2 ">
              <div className=" w-full ">
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  id="password"
                  {...register("password", {
                    required: "رمز عبور الزامی است",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="!@#$%^&*"
                  autoFocus
                  autoComplete="password"
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
          </div>
          <div className="flex justify-between items-center">
            <Button variant="default" onClick={() => router.push("./")}>
              بازگشت
            </Button>
            <Button type="submit" variant="destructive">
              ثبت نام
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
