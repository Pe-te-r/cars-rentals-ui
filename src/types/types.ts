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
  
  export interface InputDivTypes{
    label: string;
    type: string;
    placeholder: string;
    setData: (value: any) => void;
    value: any;
  }

  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    email: string;
    password: string 
    contact_phone: string;
    role:string | null;
    // full_name: string;
    // contact_phone: string;
    // address: string;
  }
  
  export interface LoginResponse {
    id:number;
    name: string;
    email: string;
    role: string;
    contact_phone: string;
    token: string;
  }
  
  export interface RegisterResponse {
    username: string;
    error?: string;
  }

  export interface ToastResponseType {
    message: string;
    type: 'error' |'success';
  }