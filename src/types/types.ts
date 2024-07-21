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
    readOnly?: boolean;
    icon?: any;
    required? : boolean;
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
    type: 'error' |'success' | '';
  }

  export interface DeleteRequest {
    id: number;
    // Add other fields needed for delete
  }
  
  export interface DeleteResponse {
    message:string
    // deletedId: number; // Example of what your API might return upon deletion
  }

  export interface UpdateUserResponse {
    success: boolean;
    user: {
      id: string;
      name: string;
      email: string;
      contact_phone: string;
      address: string;
    };
  }

  export interface UpdateUserRequest {
    id: string;
    name?: string;
    email?: string;
    contact_phone?: string;
    address?: string;
    password?: string;
    role?: string;
  };

  export interface DeleteUserRequest {
    id: string;
  }
  
  export interface DeleteUserResponse {
    message: string;
  }

  
  export interface User{
    id:string
    name: string;
    email: string;
    contact_phone:string  
    role:string
  }

  export interface vehicleResponse{
    result:string
  }

  export interface vehicleParams{
    id: string,
    rental_rate: string,
    availability: boolean,
    location_id: string
  }

  export interface getVehicleRequest{
    id?: string | undefined
    details? :boolean
  }

  export interface initialCarDetailsTypes{
    rental: string,
      availability: string,
      manufacturer:string,
      model: string,
      year:string,
      fuel_type: string,
      engine_capacity: string,
      transmission_capacity: string,
      seating_capacity: string,
      color: string,
      features: string,
      location: string,
  }