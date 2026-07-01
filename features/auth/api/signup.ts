import { axiosInstance } from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/constants";
import { ApiResponse } from "@/types/api";
import { SignupPayload, SignupResponseData } from "../types";

export const signup = async (
  data: SignupPayload,
): Promise<SignupResponseData> => {
  const response = await axiosInstance.post<ApiResponse<SignupResponseData>>(
    API_ENDPOINTS.AUTH.SIGNUP,
    data,
  );
  return response.data.data;
};
