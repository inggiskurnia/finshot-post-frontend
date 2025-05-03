export interface RegisterUser {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
