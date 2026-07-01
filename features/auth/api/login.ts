import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/constants";
import { ApiResponse } from "@/types/api";
import { LoginPayload, LoginResponseData } from "../types";

export const login = async (data: LoginPayload) => {
  const response = await axiosInstance.post<ApiResponse<LoginResponseData>>(
    API_ENDPOINTS.AUTH.LOGIN,
    data,
  );
  return response.data.data;
};
