import { useLatestCallback } from '@guoyunhe/use-latest-callback';
import { useLocation } from 'wouter';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';
import { useAuthStatus } from './useAuthStatus';

/**
 * Return `requireAuth()` function, which can be called before user trigger some actions that require
 * authentication, for example, like/dislike, comment, read membership content...
 */
export function useRequireAuth() {
  const { loginPath } = useAuth();
  const [location, navigate] = useLocation();
  const [status] = useAuthStatus();

  const requireAuth = useLatestCallback((cb?: () => void) => {
    if (status === AuthStatus.NotLoggedIn) {
      navigate(loginPath, { state: { from: location } });
    } else {
      return cb?.();
    }
  });

  return requireAuth;
}
