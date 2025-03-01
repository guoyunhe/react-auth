import { useStorage } from '@guoyunhe/react-storage';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import xior from 'xior';
import { AuthContext } from './AuthContext';
import { AuthStatus } from './AuthStatus';

export interface AuthProviderProps {
  /** Child elements */
  children: ReactNode;
  /** Inverval timeout (ms) to verify authentication status. 0 (disabled) by default. */
  fetchUserInterval?: number;
  /** Route path to login page */
  loginPath?: string;
  /** Where to redirect after logout from a protected page */
  logoutRedirectPath?: string;
}

export function AuthProvider({
  children,
  fetchUserInterval = 0,
  loginPath = '/login',
  logoutRedirectPath = '/',
}: AuthProviderProps) {
  const promiseRef = useRef<Promise<any>>();
  const [status, setStatus] = useStorage('auth_status', AuthStatus.NotSure);
  const [user, setUser] = useStorage<any>('auth_user', null);
  const [token, setToken] = useStorage<string | null>('auth_token', null);
  const [shouldFetchUser, setShouldFetchUser] = useState(0);

  if (token) {
    xior.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    xior.defaults.headers['Authorization'] = '';
  }

  const fetchUser = useCallback(() => {
    promiseRef.current = xior
      .get('/user')
      .then((res) => {
        setStatus(AuthStatus.LoggedIn);
        setUser(res.data);
      })
      .catch(() => {
        setStatus(AuthStatus.NotLoggedIn);
      });
  }, []);

  // Fetch user on demand
  useEffect(() => {
    fetchUser();
  }, [fetchUser, shouldFetchUser]);

  // Fetch user interval
  useEffect(() => {
    let timer = 0;
    if (fetchUserInterval > 0) {
      timer = window.setInterval(fetchUser, Math.max(fetchUserInterval, 3000));
    }
    return () => {
      clearInterval(timer);
    };
  }, [fetchUser, fetchUserInterval]);

  if (status === AuthStatus.NotSure && promiseRef.current) {
    throw promiseRef.current; // Trigger suspense
  }

  return (
    <AuthContext.Provider
      value={{
        status,
        setStatus,
        user,
        setUser,
        token,
        setToken,
        fetchUser: () => setShouldFetchUser((prev) => prev + 1),
        loginPath,
        logoutRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
