"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import image2 from "../../../public/2.jpg";
import image3 from "../../../public/3.png";
import Image from "next/image";
import ClientOnly from "@/components/ClientOnly";

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <ClientOnly>
      <div className="min-h-screen  bg-gradient-to-b from-blue-50 to-white items-center justify-center p-4">
        <div className="flex flex-col justify-center items-center max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            به سیستم لایتنر خوش آمدید
          </h1>
          <Image src={image2} alt="image2" width={500} height={500} />

          <div className=" flex flex-col justify-center items-center prose prose-lg mx-auto text-gray-600 space-y-4">
            <p>
              سیستم لایتنر یک روش مؤثر برای یادگیری و به خاطر سپردن اطلاعات است.
              این سیستم بر اساس تکرار فاصله‌دار عمل می‌کند و به شما کمک می‌کند
              تا مطالب را به صورت بهینه به خاطر بسپارید.
            </p>
            <p>با استفاده از این سیستم، شما می‌توانید:</p>
            <ul className="list-disc text-right mr-8 space-y-2">
              <li>کارت‌های یادگیری خود را مدیریت کنید</li>
              <li>پیشرفت یادگیری خود را پیگیری نمایید</li>
              <li>به صورت هوشمند مطالب را مرور کنید</li>
              <li>از یادگیری خود بیشترین بهره را ببرید</li>
            </ul>
          </div>
          <Image src={image3} alt="image3" width={500} height={300} />

          <div className="flex gap-4 justify-center mt-8">
            <Button
              onClick={() => router.push("/login")}
              variant="default"
              className="px-6 py-3"
            >
              ورود به سیستم
            </Button>
            <Button
              onClick={() => router.push("/signin")}
              variant="outline"
              className="px-6 py-3"
            >
              ثبت نام
            </Button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default HomePage;
