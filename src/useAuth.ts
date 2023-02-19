import { useContext } from 'react';
import { AuthContext, AuthContextValue } from './AuthContext';

// Hook to get & set auth status, user and token.
export function useAuth<U>() {
  return useContext(AuthContext) as AuthContextValue<U>;
}
