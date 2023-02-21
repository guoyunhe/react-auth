import axios from 'axios';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export function useLogout() {
  const { setStatus } = useAuth();
  const logout = () => {
    axios.post('/logout').then(() => {
      setStatus(AuthStatus.LoggedOut);
    });
  };
  return logout;
}
