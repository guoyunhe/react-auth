export * from './AuthProvider';
export * from './AuthStatus';
export * from './RedirectAfterAuth';
export * from './RequireAuth';
export * from './useAuth';
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
