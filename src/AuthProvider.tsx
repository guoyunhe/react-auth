import { useLocalStorage } from '@guoyunhe/react-storage';
import { useLatestCallback } from '@guoyunhe/use-latest-callback';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import xior from 'xior';
import { AuthContext } from './AuthContext';
import { AuthStatus } from './AuthStatus';
import { useAuthUser } from './useAuthUser';

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
  const [status, setStatus] = useLocalStorage('auth_status', AuthStatus.NotSure);
  const [user, setUser] = useAuthUser();
  const [token, setToken] = useLocalStorage<string | null>('auth_token', null);
  const [shouldFetchUser, setShouldFetchUser] = useState(0);

  useEffect(() => {
    if (token) {
      xior.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      xior.defaults.headers.Authorization = '';
    }
  }, [token]);

  const fetchUser = useLatestCallback(() => {
    promiseRef.current = xior
      .get('/user')
      .then((res) => {
        setStatus(AuthStatus.LoggedIn);
        setUser(res.data);
      })
      .catch(() => {
        setStatus(AuthStatus.NotLoggedIn);
      });
  });

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

  const value = useMemo(
    () => ({
      status,
      setStatus,
      user,
      setUser,
      token,
      setToken,
      fetchUser: () => setShouldFetchUser((prev) => prev + 1),
      loginPath,
      logoutRedirectPath,
    }),
    [loginPath, logoutRedirectPath, setStatus, setToken, setUser, status, token, user],
  );

  if (status === AuthStatus.NotSure && promiseRef.current) {
    throw promiseRef.current; // Trigger suspense
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
