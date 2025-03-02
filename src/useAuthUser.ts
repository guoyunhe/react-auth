import { useLocalStorage } from '@guoyunhe/react-storage';
import { AuthUser } from './AuthUser';

export function useAuthUser() {
  return useLocalStorage<AuthUser>('auth_user', null);
}
