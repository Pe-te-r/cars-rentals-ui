export interface Credentials {
    username: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export interface ErrorResponse {
    message: string;
    // Add other error properties as needed
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  