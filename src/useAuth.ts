import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Hook to get & set auth status, user and token.
export function useAuth() {
  return useContext(AuthContext);
}
