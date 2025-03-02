import { useLatestCallback } from '@guoyunhe/use-latest-callback';
import { useLocation } from 'wouter';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';
import { useAuthStatus } from './useAuthStatus';

/**
 * Return `requireAuth()` function, which can be called before user trigger some actions that require
 * authentication, for example, like/dislike, comment, subscription...
 *
 * Callback style usage:
 *
 * ```js
 * const requireAuth = useRequireAuth();
 * const handleLike = () => {
 *   requireAuth((error) => {
 *     if (error) {
 *       console.error(error.message);
 *     } else {
 *       xior.post('/like');
 *     }
 *   });
 * };
 * ```
 *
 * Promise style usage:
 *
 * ```js
 * const requireAuth = useRequireAuth();
 * const handleLike = () => {
 *   requireAuth().then(() => {
 *     xior.post('/like');
 *   }).catch(error => {
 *     console.error(error.message);
 *   });
 * };
 * ```
 */
export function useRequireAuth() {
  const { loginPath } = useAuth();
  const [location, navigate] = useLocation();
  const [status] = useAuthStatus();

  const requireAuth = useLatestCallback(async (callback?: (error?: Error) => void) => {
    if (status === AuthStatus.NotLoggedIn) {
      navigate(loginPath, { state: { from: location } });
      const e = new Error('Please login to continute');
      if (callback) {
        callback(e);
      } else {
        throw e;
      }
    } else {
      callback?.();
    }
  });

  return requireAuth;
}
