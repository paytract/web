import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/constants";
import { ApiResponse } from "@/types/api";
import { VerifyEmailPayload } from "../types";

export const verifyEmail = async (data: VerifyEmailPayload) => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.VERIFY_EMAIL,
    data,
  );
  return response.data;
};

export const resendVerification = async (email: string) => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.RESEND_VERIFY,
    { email },
  );
  return response.data;
};
