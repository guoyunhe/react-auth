import { useState } from 'react';
import xior from 'xior';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface UseLogoutOptions {
  errorHandler?: (reason: any) => void;
  apiUrl?: string;
}

export function useLogout(options?: UseLogoutOptions) {
  const { errorHandler, apiUrl = '/logout' } = options || {};
  const { setStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    xior
      .post(apiUrl)
      .then(() => {
        setStatus(AuthStatus.LoggedOut);
      })
      .catch(errorHandler)
      .finally(() => {
        setLoading(false);
      });
  };
  return { submit, loading };
}
