export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse<T> {
  success: boolean;
  errorMessage: string | null;
  data: T;
}

export interface UserResponse {
  email: string;
  firstName: string;
  lastName: string;
}