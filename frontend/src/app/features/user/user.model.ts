export interface RegisterCredentials {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
  }
  
export interface UserResponse<T> {
    success: boolean;
    errorMessage: string | null;
    data: T;
  }
  
export interface UserDto {
    email: string;
    firstName: string;
    lastName: string;
  }