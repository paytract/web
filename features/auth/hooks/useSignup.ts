import { useMutation } from "@tanstack/react-query";
import { signup } from "../api/signup";
import { SignupPayload } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupPayload) => signup(data),
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      // Navigate to verification page
      router.push(`/verify?email=${encodeURIComponent(data.email)}`);
    },
    onError: (error: AxiosError<any>) => {
      console.error("API Error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      // 2. Check for network errors
      else if (error.message === "Network Error") {
        toast.error("Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
  });
};
