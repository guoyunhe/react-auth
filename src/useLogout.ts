import axios from 'axios';
import { useCallback } from 'react';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export function useLogout() {
  const { setStatus } = useAuth();
  const logout = useCallback(() => {
    axios.post('/logout').then(() => {
      setStatus(AuthStatus.LoggedOut);
    });
  }, [setStatus]);
  return logout;
}
