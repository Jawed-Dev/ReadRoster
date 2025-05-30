export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse<T> {
  success: boolean;
  errorMessage: string | null;
  data: T;
}

export interface AuthDto {
  email: string;
  firstName: string;
  lastName: string;
}