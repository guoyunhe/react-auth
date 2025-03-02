import { useLatestCallback } from '@guoyunhe/use-latest-callback';
import { useMemo, useState } from 'react';
import xior from 'xior';
import { AuthStatus } from './AuthStatus';
import { useAuthStatus } from './useAuthStatus';
import { useAuthToken } from './useAuthToken';
import { useAuthUser } from './useAuthUser';

export interface UseLoginOptions {
  errorHandler?: (reason: any) => void;
  url?: string;
  getUser?: ((data: any) => any) | false;
  getToken?: ((data: any) => string) | false;
}

export function useLogin(params: any, options?: UseLoginOptions) {
  const {
    errorHandler,
    url = '/login',
    getUser = (data: any) => data?.user,
    getToken = (data: any) => data?.token?.token || data?.token,
  } = options || {};

  const [, setStatus] = useAuthStatus();
  const [, setToken] = useAuthToken();
  const [, setUser] = useAuthUser();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);

  const submit = useLatestCallback(() => {
    setLoading(true);
    xior
      .post(url, params)
      .then((res) => {
        setStatus(AuthStatus.LoggedIn);
        if (typeof getUser === 'function') {
          setUser(getUser(res.data));
        }
        if (typeof getToken === 'function') {
          setToken(getToken(res.data));
        }
        setErrors(null);
      })
      .catch((err) => {
        setErrors(err.response?.data || err.message || 'Unknown error');
        errorHandler && errorHandler(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return useMemo(() => ({ submit, loading, errors }), [submit, loading, errors]);
}
