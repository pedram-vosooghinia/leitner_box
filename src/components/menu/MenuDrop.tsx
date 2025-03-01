"use client";
import useUserStore from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { CircleUser, UserPlus, LogOut, LogIn } from "lucide-react";
import useLogout from "@/hooks/useLogout";
const MenuDrop = () => {
  const { user } = useUserStore() as { user: User | null };
  const handleLogout = useLogout();
  const router = useRouter();
  return (
    <div className="rtl z-50 flex justify-end items-center  fixed  w-full h-20   bg-red-500 ">
      <div className=" mx-4"> 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="py-4">
            {user !== null && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>پروفایل من</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className="rtl">
                      <div>نام: {user?.first_name}</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rtl">
                      <div>نام خانوادگی: {user?.last_name}</div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rtl">
                      <div>موبایل: {user?.mobile}</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rtl">
                      <div className="rtl"> نقش: {user?.role}</div>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
            {user === null ? (
              <DropdownMenuItem
                className="pt-12"
                onClick={() => router.push("/login")}
              >
                <Button className="cursor-pointer ">
                  <span className="flex justify-between items-center mx-2 ">
                    <LogIn className="mr-2 h-4 w-4" />
                    <div>ورود</div>
                  </span>
                </Button>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="pt-12" onClick={handleLogout}>
                <Button className="cursor-pointer ">
                  <span className="flex justify-between items-center mx-2 ">
                    <LogOut className="mr-2 h-4 w-4" />
                    <div>خروج</div>
                  </span>
                </Button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
export default MenuDrop;
