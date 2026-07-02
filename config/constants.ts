export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://paytract-api.ifedevs.fyi";

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "paytract_access_token",
  REFRESH_TOKEN: "paytract_refresh_token",
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/user/auth/signin",
    SIGNUP: "/api/v1/user/auth/signup",
    // REFRESH_TOKEN: "/api/v1/user/auth/refresh",
    VERIFY_EMAIL: "/api/v1/user/auth/signup/verify",
    RESEND_VERIFY: "/api/v1/user/auth/signup/resend-verification",
    PASSWORD_RESET: "/api/v1/user/auth/password/reset",
    PASSWORD_RESET_CHECK: "/api/v1/user/auth/password/reset/check",
    PASSWORD_RESET_CONFIRM: "/api/v1/user/auth/password/reset/confirm",
  },
};
