
import type { HealthStatus } from '../types';

let mockToken: string | null = null;

export const checkHealth = async (): Promise<HealthStatus> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const isAuthenticated = (): boolean => {
  return !!mockToken;
};

export const login = (credentials: any) => {
  mockToken = 'mock_token_' + Date.now();
};

export const logout = () => {
  mockToken = null;
};
