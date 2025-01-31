import { AuthResponse, LoginInput } from '@/lib/types/user';
import userData from '@/data/users.json';
import jwt from 'jsonwebtoken';


export class AuthService {
  private static instance: AuthService;
  private readonly JWT_SECRET: string;

 /**
  * The private constructor function initializes the JWT_SECRET property with the value from the
  * NEXT_PUBLIC_JWT_SECRET environment variable or throws an error if it is not configured.
  */
  private constructor() {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado');
    }
    this.JWT_SECRET = secret;
  }

  /**
   * The function `getInstance` returns a single instance of the `AuthService` class using the
   * Singleton design pattern in TypeScript.
   * @returns The `AuthService` instance is being returned.
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * The function `login` takes user credentials, validates them, generates a JWT token, and returns an
   * authentication response with the token and user details.
   * @param {LoginInput} credentials - The `credentials` parameter in the `login` function represents
   * the input data required for a user to log in. It typically includes the user's email and password.
   * @returns The `login` function returns a Promise that resolves to an `AuthResponse` object. The
   * `AuthResponse` object contains a `token` property which is a JWT token generated for the user, and
   * a `user` property which is an object containing user information without the password.
   */
  async login(credentials: LoginInput): Promise<AuthResponse> {
    try {
      const user = userData.users.find(u => u.email === credentials.email);

      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email 
        },
        this.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log('token', token);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return {
        token,
        user: userWithoutPassword
      };
  } catch (error : unknown) {
    throw new Error(error instanceof Error ? error.message : 'Error al iniciar sesión');
  }
}
}