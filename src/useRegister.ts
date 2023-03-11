import { useLogin, UseLoginOptions } from './useLogin';

export function useRegister(data: any, options?: UseLoginOptions) {
  const { apiUrl = '/register', ...otherOptions } = options || {};
  return useLogin(data, { apiUrl, ...otherOptions });
}
