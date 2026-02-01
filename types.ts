
export interface HealthStatus {
  ok: boolean;
}

export interface User {
  username: string;
  role: 'admin' | 'user';
}
