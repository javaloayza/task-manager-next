import { useAuthStore } from '@/store/auth.store';
import { AuthService } from '@/services/auth.service';
import { LoginInput } from '@/lib/types/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * The `useAuth` hook is a custom hook that provides the necessary functions and state to handle user
 * authentication. It uses the `useAuthStore` hook to access the store and the `AuthService` class to
 * interact with the authentication service.
 * @returns The `useAuth` hook returns an object containing the `login` and `logout` functions, the
 * `loading` state to indicate when an operation is in progress, and the `error` state to hold any
 * error messages that occur during authentication.
 */
export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, clearAuth } = useAuthStore();
  const router = useRouter();
  const authService = AuthService.getInstance();

 /**
  * The `login` function is an asynchronous function that handles user login by sending credentials to
  * an authentication service, setting user authentication data, saving a token in a cookie for
  * persistence, and redirecting to the tasks page.
  * @param {LoginInput} credentials - The `credentials` parameter in the `login` function 
  * represents the user's login information, such as their username and password. It is of type
  * `LoginInput`, which could be an object containing the necessary fields for authentication.
  */
  const login = async (credentials: LoginInput) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      setAuth(response.user, response.token);

      // Save token in cookie for persistence
      document.cookie = `token=${response.token}; path=/`;
      
      router.push('/tasks');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  return {
    login,
    logout,
    loading,
    error
  };
};