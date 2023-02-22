import axios from 'axios';
import { useState } from 'react';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface UseLoginOptions {
  errorHandler?: (reason: any) => void;
  apiUrl?: string;
}

export function useLogin(data: any, options?: UseLoginOptions) {
  const { errorHandler, apiUrl = '/login' } = options || {};
  const { setStatus, setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    axios
      .post(apiUrl, data)
      .then((res) => {
        setStatus(AuthStatus.LoggedIn);
        setUser(res.data.user);
        setToken(res.data.token);
      })
      .catch(errorHandler)
      .finally(() => {
        setLoading(false);
      });
  };
  return { submit, loading };
}
