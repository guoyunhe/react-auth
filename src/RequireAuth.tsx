import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.status === AuthStatus.LoggedOut) {
      navigate(auth.logoutRedirectPath);
      auth.setStatus(AuthStatus.NotLoggedIn);
    }
  }, [auth, navigate]);

  if (auth.status === AuthStatus.NotSure) {
    return <>{auth.loadingIndicator}</>;
  }

  if (auth.status === AuthStatus.NotLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={auth.loginPath} state={{ from: location }} />;
  }

  return <>{children}</>;
}
