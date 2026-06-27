import { axiosInstance } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/constants';
import { LoginCredentials, AuthResponse } from '../types';
import { ApiResponse } from '@/types/api';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Production implementation:
  // const response = await axiosInstance.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, credentials);
  // return response.data.data;
  
  // Mock implementation for boilerplate demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: '1', email: credentials.email, name: 'Test User' },
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token'
      });
    }, 1000);
  });
};
