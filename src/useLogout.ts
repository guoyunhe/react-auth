import { useLatestCallback } from '@guoyunhe/use-latest-callback';
import { useMemo, useState } from 'react';
import xior from 'xior';
import { AuthStatus } from './AuthStatus';
import { useAuthStatus } from './useAuthStatus';

export interface UseLogoutOptions {
  url?: string;
}

export function useLogout(options?: UseLogoutOptions) {
  const { url = '/logout' } = options || {};
  const [, setStatus] = useAuthStatus();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useLatestCallback(() => {
    setLoading(true);
    xior
      .post(url)
      .then(() => {
        setStatus(AuthStatus.LoggedOut);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return useMemo(() => ({ submit, loading, error }), [submit, loading, error]);
}
