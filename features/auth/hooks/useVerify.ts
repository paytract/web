import { useMutation } from "@tanstack/react-query";
import { verifyEmail, resendVerification } from "../api/verify";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useVerifyEmail = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      toast.success(data.message || "Account verified successfully!");
      router.push("/login");
    },
    onError: (error: any) =>
      toast.error(
        error.response?.data?.message || "Invalid verification code.",
      ),
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendVerification,
    onSuccess: (data) =>
      toast.success(data.message || "Code resent successfully!"),
    onError: (error: any) =>
      toast.error(error.response?.data?.message || "Failed to resend code."),
  });
};
