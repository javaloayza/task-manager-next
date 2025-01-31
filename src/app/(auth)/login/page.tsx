'use client'

import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

//validation
const loginSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * The `LoginPage` component in TypeScript React handles user login functionality with form validation
 * and error handling.
 * @returns The `LoginPage` component is being returned. It is a functional component that displays a
 * login form with email and password fields. The component handles form submission, error handling, and loading state related to
 * authentication using the `useAuth` hook and form validation using the `useForm` hook with Zod schema
 * validation.
 */
const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Iniciar Sesión 🔐
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
                {...register('email')}
                className={`w-full p-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Ingresa tu email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className={`w-full p-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Ingresa tu contraseña"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;