import { ReactNode, useEffect } from 'react';
import { Redirect, useLocation } from 'wouter';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';
import { useAuthStatus } from './useAuthStatus';

export interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { loginPath, logoutRedirect: logoutRedirectPath } = useAuth();
  const [status, setStatus] = useAuthStatus();

  const [location, navigate] = useLocation();

  useEffect(() => {
    if (status === AuthStatus.LoggedOut) {
      navigate(logoutRedirectPath);
      setStatus(AuthStatus.NotLoggedIn);
    }
  }, [logoutRedirectPath, navigate, setStatus, status]);

  if (status === AuthStatus.NotLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Redirect to={loginPath} state={{ from: location }} />;
  }

  return <>{children}</>;
}
