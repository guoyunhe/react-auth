import axios from 'axios';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import useLocalStorage from 'react-use-localstorage';
import { AuthContext } from './AuthContext';
import { AuthStatus } from './AuthStatus';

export interface AuthProviderProps {
  /** Child elements */
  children: ReactNode;
  /** Inverval timeout (ms) to verify authentication status. 0 (disabled) by default. */
  verifyInterval?: number;
  /** Route path to login page */
  loginPath?: string;
  /** Where to redirect after logout from a protected page */
  logoutRedirectPath?: string;
  /** Content to render when verifying authentication initially */
  loadingIndicator?: ReactNode;
}

export function AuthProvider({
  children,
  verifyInterval = 0,
  loginPath = '/login',
  logoutRedirectPath = '/',
  loadingIndicator = 'Loading...',
}: AuthProviderProps) {
  const [status, setStatus] = useState(AuthStatus.NotSure);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useLocalStorage(PACKAGE_NAME + '/token', '');

  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    axios.defaults.headers['Authorization'] = '';
  }

  const verify = useCallback(() => {
    console.log('verify');
    axios
      .get('/user')
      .then((res) => {
        setStatus(AuthStatus.LoggedIn);
        setUser(res.data);
        console.log(res.data);
      })
      .catch(() => {
        setStatus(AuthStatus.NotLoggedIn);
      });
  }, []);

  // Initial verification
  useEffect(() => {
    verify();
  }, []);

  // Verification interval
  useEffect(() => {
    let timer = 0;
    if (verifyInterval > 0) {
      timer = setInterval(verify, Math.max(verifyInterval, 3000));
    }
    return () => {
      clearInterval(timer);
    };
  }, [verifyInterval]);

  return (
    <AuthContext.Provider
      value={{
        status,
        setStatus,
        user,
        setUser,
        token,
        setToken,
        loginPath,
        logoutRedirectPath,
        loadingIndicator,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
