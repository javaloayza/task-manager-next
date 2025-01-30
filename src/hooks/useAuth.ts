import { useAuthStore } from '@/store/auth.store';
import { AuthService } from '@/services/auth.service';
import { LoginInput } from '@/lib/types/user';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, clearAuth } = useAuthStore();
  const router = useRouter();
  const authService = AuthService.getInstance();

  const login = async (credentials: LoginInput) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      console.log(response);
      setAuth(response.user, response.token);
      console.log(response);

      // Guardar token en cookie para persistencia
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