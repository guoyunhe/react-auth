import axios from 'axios';
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
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
  const [status, setStatus] = useState(AuthStatus.NotSure);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useLocalStorage(PACKAGE_NAME + '/token', '');
  const [shouldFetchUser, setShouldFetchUser] = useState(0);

  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers['Authorization'] = '';
  }

  const fetchUser = useCallback(() => {
    promiseRef.current = axios
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
      timer = setInterval(fetchUser, Math.max(fetchUserInterval, 3000));
    }
    return () => {
      clearInterval(timer);
    };
  }, [fetchUser, fetchUserInterval]);

  if (status === AuthStatus.NotSure) {
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
