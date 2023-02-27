import axios from 'axios';
import { useState } from 'react';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export interface UseLoginOptions {
  errorHandler?: (reason: any) => void;
  apiUrl?: string;
  getUser?: ((data: any) => any) | false;
  getToken?: ((data: any) => string) | false;
}

export function useLogin(data: any, options?: UseLoginOptions) {
  const {
    errorHandler,
    apiUrl = '/login',
    getUser = (data: any) => data?.user,
    getToken = (data: any) => data?.user,
  } = options || {};
  const { setStatus, setUser, setToken, fetchUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const submit = () => {
    setLoading(true);
    axios
      .post(apiUrl, data)
      .then((res) => {
        setStatus(AuthStatus.LoggedIn);
        if (typeof getUser === 'function') {
          setUser(getUser(res.data));
        } else {
          // if the login api doesn't return user object, fetch user
          fetchUser();
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
  };
  return { submit, loading, errors };
}
