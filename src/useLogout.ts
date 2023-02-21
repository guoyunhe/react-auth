import axios from 'axios';
import { useState } from 'react';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface UseLogoutOptions {
  errorHandler?: (reason: any) => void;
}

export function useLogout(options?: UseLogoutOptions) {
  const { errorHandler } = options || {};
  const { setStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    axios
      .post('/logout')
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
