import { createContext } from 'react';
import { AuthStatus } from './AuthStatus';

export interface AuthContextValue<U = unknown> {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
  user: U | null;
  setUser: (user: U | null) => void;
  token: string;
  setToken: (token: string) => void;
  fetchUser: () => void;
  loginPath: string;
  logoutRedirectPath: string;
}

export const AuthContext = createContext<AuthContextValue>({
  status: AuthStatus.NotSure,
  setStatus: () => null,
  user: null,
  setUser: () => null,
  token: '',
  setToken: () => null,
  fetchUser: () => null,
  loginPath: '/login',
  logoutRedirectPath: '/',
});
