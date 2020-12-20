export interface UserLoginData {
    email: string,
    password: string
  }

export interface UserRole {
  id: string,
  user_id: string;
  role: string
}