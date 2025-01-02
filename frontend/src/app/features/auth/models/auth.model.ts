export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse<UserResponse> {
    success: boolean;
    errorMessage: string | null;
    data: UserResponse | null;
    
}
export interface UserResponse {
    email: string;
    firstName: string;
    lastName: string;
}