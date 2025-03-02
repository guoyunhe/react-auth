import { createContext } from 'react';
import type { AuthToken, AuthUser } from '.';

export interface AuthContextValue {
  /** Route path to login page */
  loginPath: string;
  /** Where to redirect after login if no previous history */
  loginRedirect: string;
  /** Where to redirect after logout from a protected page */
  logoutRedirect: string;
  /** Refresh auth token before it expires */
  refresh: () => Promise<AuthToken>;
  validate: () => Promise<AuthUser>;
}

export const defaultAuthContextValue: AuthContextValue = {
  loginPath: '/login',
  loginRedirect: '/',
  logoutRedirect: '/',
  refresh: async () => {
    throw new Error('refresh function is not implemented');
  },
  validate: async () => {
    throw new Error('validate function is not implemented');
  },
};

export const AuthContext = createContext(defaultAuthContextValue);
