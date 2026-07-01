export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://paytract-api.ifedevs.fyi";

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "paytract_access_token",
  REFRESH_TOKEN: "paytract_refresh_token",
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/user/auth/login",
    SIGNUP: "/api/v1/user/auth/signup",
    REFRESH_TOKEN: "/api/v1/user/auth/refresh",
    VERIFY_EMAIL: "/api/v1/user/auth/verify-email",
  },
};
