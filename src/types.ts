export type HealthStatus = {
  ok: boolean;
};

export type User = {
  username: string;
  role: 'admin' | 'user';
};