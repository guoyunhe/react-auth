import { useLatestCallback } from '@guoyunhe/use-latest-callback';
import { useEffect } from 'react';
import xior from 'xior';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';
import { useAuthStatus } from './useAuthStatus';
import { useAuthToken } from './useAuthToken';
import { useAuthUser } from './useAuthUser';

export function AuthValidator() {
  const { refresh, validate } = useAuth();
  const latestRefresh = useLatestCallback(refresh);
  const latestValidate = useLatestCallback(validate);
  const [, setStatus] = useAuthStatus();
  const [token, setToken] = useAuthToken();
  const [, setUser] = useAuthUser();

  if (token) {
    xior.defaults.headers.Authorization = `Bearer ${token.value}`;
  } else {
    xior.defaults.headers.Authorization = '';
  }

  // token validation & refresh
  useEffect(() => {
    let refreshTimer = 0;

    if (!token?.value) {
      // token invalid
      setStatus(AuthStatus.NotLoggedIn);
    } else if (token?.expiresAt && new Date(token.expiresAt).getTime() < Date.now()) {
      // token invalid
      setStatus(AuthStatus.Expired);
    } else {
      // server side validation
      latestValidate()
        .then((newUser) => {
          setUser(newUser);
          setStatus(AuthStatus.LoggedIn);
          if (token?.expiresAt) {
            // token hasn't expired yet, schedule a refresh
            refreshTimer = window.setTimeout(
              () => {
                latestRefresh()
                  .then((newToken) => {
                    setToken(newToken);
                  })
                  .catch(() => {
                    // refresh failed, token expired
                    setStatus(AuthStatus.Expired);
                  });
              },
              // refresh 30 sec in advance before expires
              new Date(token.expiresAt).getTime() - Date.now() - 30000,
            );
          }
        })
        .catch(() => {
          // token invalid
          setStatus(AuthStatus.NotLoggedIn);
        });
    }

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [latestRefresh, latestValidate, setStatus, setToken, setUser, token]);

  return null;
}
