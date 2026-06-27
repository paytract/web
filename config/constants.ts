export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.paytract.example.com';

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'paytract_access_token',
  REFRESH_TOKEN: 'paytract_refresh_token',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REFRESH_TOKEN: '/auth/refresh',
  },
};
