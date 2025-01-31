import '@testing-library/jest-dom';
import { AuthService } from './auth.service';
import { LoginInput } from '@/lib/types/user';
import jwt from 'jsonwebtoken';

process.env.NEXT_PUBLIC_JWT_SECRET = 'test-secret';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mock-token')
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    (jwt.sign as jest.Mock).mockReturnValue('mock-token');
    authService = AuthService.getInstance();
  });

  /* This test case is checking the behavior of the `login` method in the `AuthService` class when
  valid credentials are provided. */
  it('should login with valid credentials', async () => {
    const credentials: LoginInput = {
      email: 'test@example.com',
      password: 'test123'
    };

    const result = await authService.login(credentials);

    expect(result.token).toBe('mock-token');
    expect(result.user.email).toBe(credentials.email);
  });

  /* This test case is checking the behavior of the `login` method in the `AuthService` class when
  invalid credentials are provided. It sets up a scenario where the `login` method is called with
  incorrect credentials (email and password). The test expects that calling
  `authService.login(credentials)` will result in a rejection (throwing an error) with the message
  'Invalid credentials'. This is to ensure that the `login` method correctly handles and rejects
  invalid login attempts. */
  it('should throw error with invalid credentials', async () => {
    const credentials: LoginInput = {
      email: 'wrong@example.com',
      password: 'wrong'
    };

    await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials');
  });
});