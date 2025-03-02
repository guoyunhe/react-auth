import { useLogin, UseLoginOptions } from './useLogin';

export function useRegister(data: any, options?: UseLoginOptions) {
  const { url: apiUrl = '/register', ...otherOptions } = options || {};

  return useLogin(data, { url: apiUrl, ...otherOptions });
}
