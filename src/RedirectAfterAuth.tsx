import { Redirect } from 'wouter';
import { AuthStatus } from './AuthStatus';
import { useAuthStatus } from './useAuthStatus';

export interface RedirectAfterAuthProps {
  to?: string;
}

export function RedirectAfterAuth({ to }: RedirectAfterAuthProps) {
  const [status] = useAuthStatus();

  if (status === AuthStatus.LoggedIn) {
    return <Redirect to={history.state?.from || to || '/'} />;
  } else {
    return null;
  }
}
