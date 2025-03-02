import { createContext } from 'react';
import { AuthStatus } from './AuthStatus';
import { AuthUser } from './AuthUser';

export interface AuthContextValue {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  fetchUser: () => void;
  loginPath: string;
  logoutRedirectPath: string;
}

export const AuthContext = createContext<AuthContextValue>({
  status: AuthStatus.NotSure,
  setStatus: () => null,
  user: null,
  setUser: () => null,
  token: null,
  setToken: () => null,
  fetchUser: () => null,
  loginPath: '/login',
  logoutRedirectPath: '/',
});
