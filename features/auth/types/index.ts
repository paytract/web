export interface SignupPayload {
  email: string;
  password: string;
  full_name: string;
  phone: string;
}

export interface SignupResponseData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}
