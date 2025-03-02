import { ReactNode, useMemo } from 'react';
import { AuthContext, AuthContextValue, defaultAuthContextValue } from './AuthContext';
import { AuthValidator } from './AuthValidator';

export interface AuthProviderProps extends Partial<AuthContextValue> {
  /** Child elements */
  children: ReactNode;
}

export function AuthProvider({
  children,
  loginPath = defaultAuthContextValue.loginPath,
  loginRedirect = defaultAuthContextValue.loginRedirect,
  logoutRedirect = defaultAuthContextValue.logoutRedirect,
  refresh = defaultAuthContextValue.refresh,
  validate = defaultAuthContextValue.validate,
}: AuthProviderProps) {
  const value = useMemo(
    () => ({
      loginPath,
      loginRedirect,
      logoutRedirect,
      refresh,
      validate,
    }),
    [loginPath, loginRedirect, logoutRedirect, refresh, validate],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthValidator />
    </AuthContext.Provider>
  );
}
