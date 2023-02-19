import { createContext } from 'react';
import { AuthStatus } from './AuthStatus';

export interface AuthContextValue<U = unknown> {
  status: AuthStatus;
  setStatus: (status: AuthStatus) => void;
  user: U | null;
  setUser: (user: U | null) => void;
  token: string | null;
  setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  status: AuthStatus.NotSure,
  setStatus: () => null,
  user: null,
  setUser: () => null,
  token: null,
  setToken: () => null,
});
