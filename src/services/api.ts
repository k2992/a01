import type { HealthStatus } from '../types';

let mockToken: string | null = null;

export const checkHealth = async (): Promise<HealthStatus> => {
  try {
    // Artificial latency for "connection feel"
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const isAuthenticated = (): boolean => {
  return !!mockToken;
};

export const login = (credentials: any) => {
  console.debug('AUTHENTICATION_SUCCESS:', credentials.username);
  mockToken = 'authorized_session_' + Date.now();
};

export const logout = () => {
  mockToken = null;
};