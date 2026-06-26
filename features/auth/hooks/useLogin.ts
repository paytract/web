import { useMutation } from "@tanstack/react-query";
import { loginWithEmail } from "../api/login";
import { STORAGE_KEYS } from "@/config/constants";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: (data) => {
      // Handle success (save token, redirect, etc.)
      localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
      // Redux dispatch to set user could go here, or router.push('/dashboard')
    },
    onError: (error) => {
      // Handle error globally if needed
      console.error("Login failed:", error);
    },
  });
};
