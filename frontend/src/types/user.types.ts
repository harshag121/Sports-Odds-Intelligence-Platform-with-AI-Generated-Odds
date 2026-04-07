export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthPayload {
  user: User;
  tokens: AuthTokens;
}
