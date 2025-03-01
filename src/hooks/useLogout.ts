import { useRouter } from "next/navigation";
import { logoutServices } from "@/services/auth";
import useUserStore from "@/store/userStore";
import toast from "react-hot-toast";

const useLogout = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  const logout = async () => {
    try {
      const res = await logoutServices();

      if (res.data?.status === 200) {
        toast.success(res.data.message || "خروج موفقیت‌آمیز بود");
        clearUser();
        router.push("/");
      } else {
        toast.error(res.data?.message || "خطایی رخ داده است");
      }
    } catch {
      toast.error("خطای شبکه لطفا دوباره تلاش نمایید");
    }
  };

  return logout;
};

export default useLogout;
