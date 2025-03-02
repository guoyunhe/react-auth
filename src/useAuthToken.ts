import { useLocalStorage } from '@guoyunhe/react-storage';
import type { AuthToken } from '.';

export function useAuthToken() {
  return useLocalStorage<AuthToken | null>('auth_token', null);
}
