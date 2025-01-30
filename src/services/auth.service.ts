import { AuthResponse, LoginInput } from '@/lib/types/user';
import userData from '@/data/users.json';
import jwt from 'jsonwebtoken';

export class AuthService {
  private static instance: AuthService;
  private readonly JWT_SECRET: string;

  private constructor() {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no está configurado');
    }
    this.JWT_SECRET = secret;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginInput): Promise<AuthResponse> {
    try {
      const user = userData.users.find(u => u.email === credentials.email);
      console.log(user);

      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials');
      }

      console.log('JWT_SECRET:', this.JWT_SECRET); // Para debug

      // if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
      //   throw new Error('JWT_SECRET no está configurado');
      // }

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