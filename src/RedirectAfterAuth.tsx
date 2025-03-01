import { Redirect } from 'wouter';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface RedirectAfterAuthProps {
  to?: string;
}

export function RedirectAfterAuth({ to }: RedirectAfterAuthProps) {
  const auth = useAuth();

  if (auth.status === AuthStatus.LoggedIn) {
    return <Redirect to={history.state?.from || to || '/'} />;
  } else {
    return null;
  }
}
