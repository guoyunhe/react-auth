import { ReactNode, useEffect } from 'react';
import { Redirect, useLocation } from 'wouter';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();

  const [location, navigate] = useLocation();

  useEffect(() => {
    if (auth.status === AuthStatus.LoggedOut) {
      navigate(auth.logoutRedirectPath);
      auth.setStatus(AuthStatus.NotLoggedIn);
    }
  }, [auth, navigate]);

  if (auth.status === AuthStatus.NotLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Redirect to={auth.loginPath} state={{ from: location }} />;
  }

  return <>{children}</>;
}
