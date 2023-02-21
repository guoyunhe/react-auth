import axios from 'axios';
import { useState } from 'react';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export function useLogin(data: any) {
  const { setStatus, setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    axios
      .post('/login', data)
      .then((res) => {
        setStatus(AuthStatus.LoggedIn);
        setUser(res.data.user);
        setToken(res.data.token);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { submit, loading };
}
