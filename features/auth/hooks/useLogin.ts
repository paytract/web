import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEYS } from "@/config/constants";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Welcome back!");

      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Invalid email or password.",
      );
    },
  });
};
