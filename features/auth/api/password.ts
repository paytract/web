import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/constants";
import { ApiResponse } from "@/types/api";
import {
  PasswordResetPayload,
  PasswordResetCheckPayload,
  PasswordResetConfirmPayload,
} from "../types";

export const requestPasswordReset = async (data: PasswordResetPayload) => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.PASSWORD_RESET,
    data,
  );
  return response.data;
};

export const checkResetToken = async (data: PasswordResetCheckPayload) => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.PASSWORD_RESET_CHECK,
    data,
  );
  return response.data;
};

export const confirmPasswordReset = async (
  data: PasswordResetConfirmPayload,
) => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.PASSWORD_RESET_CONFIRM,
    data,
  );
  return response.data;
};
