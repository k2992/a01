
import { HealthStatus } from '../types';

/**
 * Mocking the API health check as requested.
 * In a real environment, this would call fetch("/api/health")
 */
export const checkHealth = async (): Promise<HealthStatus> => {
  try {
    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In actual deployment with a proxy, this would be:
    // const res = await fetch("/api/health");
    // return res.json();
    
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
};

export const AUTH_TOKEN_KEY = 'metalab_token';

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export const login = (credentials: any) => {
  localStorage.setItem(AUTH_TOKEN_KEY, 'mock_token_' + Date.now());
};

export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
