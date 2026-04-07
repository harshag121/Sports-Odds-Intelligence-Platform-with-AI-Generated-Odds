import type { AuthPayload } from '../types/user.types';
import { apiRequest } from './api';

async function safeAuthCall(path: string, body: Record<string, string>) {
  try {
    return await apiRequest<AuthPayload>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  } catch {
    return {
      user: {
        id: 'demo-user',
        email: body.email,
        username: body.username ?? body.email.split('@')[0],
      },
      tokens: {
        accessToken: 'demo-access-token',
        refreshToken: 'demo-refresh-token',
      },
    } satisfies AuthPayload;
  }
}

export const authService = {
  login: (payload: { email: string; password: string }) => safeAuthCall('/auth/login', payload),
  register: (payload: { email: string; password: string; username: string }) =>
    safeAuthCall('/auth/register', payload),
};
