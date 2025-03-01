import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export function useRequireAuth() {
  const auth = useAuth();
  const [location, navigate] = useLocation();

  const requireAuth = useCallback(() => {
    if (auth.status === AuthStatus.NotLoggedIn) {
      navigate(auth.loginPath, { state: { from: location } });
      return false;
    } else {
      return true;
    }
  }, [auth, location, navigate]);

  return requireAuth;
}
