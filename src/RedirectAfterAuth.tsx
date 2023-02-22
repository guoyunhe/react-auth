import { Navigate, useLocation } from 'react-router-dom';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export function RedirectAfterAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === AuthStatus.LoggedIn) {
    return <Navigate to={location.state?.from?.pathname || '/'} />;
  } else {
    return null;
  }
}
