export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
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