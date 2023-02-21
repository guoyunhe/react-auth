import axios from 'axios';
import { AuthStatus } from './AuthStatus';
import { useAuth } from './useAuth';

export function useLogin(data: any) {
  const { setStatus, setUser, setToken } = useAuth();
  const login = () => {
    axios.post('/login', data).then((res) => {
      setStatus(AuthStatus.LoggedIn);
      setUser(res.data.user);
      setToken(res.data.token);
    });
  };
  return login;
}
