'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import jwt_decode from 'jwt-decode';

/**
 * The AuthProvider function in TypeScript React initializes authentication, decoding a token from a
 * cookie and setting user information, while displaying a loading spinner until authentication is
 * complete.
 * @param  - The `AuthProvider` component is a React component that handles authentication logic for
 * your application. Here's a breakdown of the parameters and functionality in the code snippet you
 * provided:
 * @returns The `AuthProvider` component returns either a loading spinner if `isLoading` is true, or
 * the `children` components if `isLoading` is false.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const initializeAuth = async () => {
      const startTime = Date.now();
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (token) {
        try {
          const decoded = jwt_decode(token) as { userId: string; email: string; name: string };
          setAuth({ id: decoded.userId, email: decoded.email, name: decoded.name }, token);
        } catch (error) {
          console.error('Error decodificando token:', error);
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
      }

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1000 - elapsedTime, 0);

      await new Promise(resolve => setTimeout(resolve, remainingTime));
      setIsLoading(false);
    };

    initializeAuth();
  }, [setAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin  rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}