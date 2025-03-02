export * from './AuthProvider';
export * from './AuthStatus';
export * from './RedirectAfterAuth';
export * from './RequireAuth';
export * from './useAuthStatus';
export * from './useAuthToken';
export * from './useAuthUser';
export * from './useLogin';
export * from './useLogout';
export * from './useRegister';
export * from './useRequireAuth';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthToken {
  value: string;
  expiresAt: string | null;
}
