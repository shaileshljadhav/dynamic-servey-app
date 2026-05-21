export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: 'admin' | 'user';
  user: {
    id: number;
    name: string;
  };
}