import { useMutation } from '@tanstack/react-query';
import { login } from '../api/login';
import { LoginCredentials, AuthResponse } from '../types';

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: (credentials) => login(credentials),
    onSuccess: (data) => {
      // Typically store tokens or dispatch Redux action here
      console.log('Login successful', data);
    },
  });
};
