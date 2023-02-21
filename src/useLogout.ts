import axios from 'axios';
import { useState } from 'react';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export function useLogout() {
  const { setStatus } = useAuth();
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);

    axios
      .post('/logout')
      .then(() => {
        setStatus(AuthStatus.LoggedOut);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { submit, loading };
}
