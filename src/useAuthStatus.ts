import { useLocalStorage } from '@guoyunhe/react-storage';
import { AuthStatus } from './AuthStatus';

export function useAuthStatus() {
  return useLocalStorage('auth_status', AuthStatus.NotLoggedIn);
}
