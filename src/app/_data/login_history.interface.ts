export interface LoginHistory {
  id: string;
  userEmail: string;
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: number;
  refreshExpiresAt: number;
  createdAt: number;
  updatedAt: number;
}
