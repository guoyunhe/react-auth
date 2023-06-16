import { Navigate, useLocation } from 'react-router-dom';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface RedirectAfterAuthProps {
  to?: string;
}

export function RedirectAfterAuth({ to }: RedirectAfterAuthProps) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === AuthStatus.LoggedIn) {
    return <Navigate to={location.state?.from?.pathname || to || '/'} />;
  } else {
    return null;
  }
}
