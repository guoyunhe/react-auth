import { useLocalStorage } from '@guoyunhe/react-storage';
import type { AuthUser } from '.';

export function useAuthUser() {
  return useLocalStorage<AuthUser>('auth_user', null);
}
