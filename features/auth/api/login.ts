import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/api";
import { LoginCredentials, AuthResponse } from "../types";

export const loginWithEmail = async (
  data: LoginCredentials,
): Promise<AuthResponse> => {
  const response = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    data,
  );
  return response.data.data;
};
