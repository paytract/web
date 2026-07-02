import { useMutation, useQuery } from "@tanstack/react-query";
import {
  requestPasswordReset,
  checkResetToken,
  confirmPasswordReset,
} from "../api/password";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRequestReset = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      // Custom user-friendly message as requested
      toast.success("Check your email, we've sent a link.");
      router.push("/login");
    },
    onError: (error: any) =>
      toast.error(
        error.response?.data?.message || "Failed to send reset link.",
      ),
  });
};

export const useCheckToken = (user_id: string | null, token: string | null) => {
  return useQuery({
    queryKey: ["check-reset-token", user_id, token],
    queryFn: () => checkResetToken({ user_id: user_id!, token: token! }),
    enabled: !!user_id && !!token,
    retry: false,
  });
};

export const useConfirmReset = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: confirmPasswordReset,
    onSuccess: () => {
      toast.success("Password successfully reset! You can now log in.");
      router.push("/login");
    },
    onError: (error: any) =>
      toast.error(error.response?.data?.message || "Failed to reset password."),
  });
};
