'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { prisma } from '../lib/db'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type LoginError = {
  error: {
    title: string;
    message: string;
    field?: 'email' | 'password';
  }
};

type LoginSuccess = {
  success: true;
};

type LoginResponse = LoginError | LoginSuccess;

export async function login(formData: { email: string, password: string }): Promise<LoginResponse> {
  try {
    // Validate input
    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        error: {
          title: "Validation Error",
          message: "Please check your email and password",
          field: parsed.error.errors[0]?.path[0] as 'email' | 'password'
        }
      };
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { email: formData.email }
    });

    if (!user) {
      return {
        error: {
          title: "Authentication Error",
          message: "No user found with this email",
          field: "email"
        }
      };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(formData.password, user.password);
    if (!isValidPassword) {
      return {
        error: {
          title: "Authentication Error",
          message: "Invalid password",
          field: "password"
        }
      };
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return {
      error: {
        title: "Server Error",
        message: "An unexpected error occurred"
      }
    };
  }
}

export async function checkAuth() {
  try {
    const token = cookies().get('auth-token')?.value;
    
    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
      email: string;
      name: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        status: true
      }
    });

    return user;
  } catch {
    return null;
  }
}

export async function logout() {
  cookies().delete('auth-token');
}

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignupError = {
  error: {
    title: string;
    message: string;
    field?: 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword';
  }
};

type SignupSuccess = {
  success: true;
};

type SignupResponse = SignupError | SignupSuccess;

export async function signup(formData: {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
}): Promise<SignupResponse> {
  try {
    // Validate input
    const parsed = signupSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        error: {
          title: "Validation Error",
          message: parsed.error.errors[0]?.message || "Please check your input",
          field: parsed.error.errors[0]?.path[0] as 'firstName' | 'lastName' | 'email' | 'password' | 'confirmPassword'
        }
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: formData.email }
    });

    if (existingUser) {
      return {
        error: {
          title: "Registration Error",
          message: "An account with this email already exists",
          field: "email"
        }
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: formData.email,
        password: hashedPassword,
        name: `${formData.firstName} ${formData.lastName}`,
        status: 'ACTIVE'
      }
    });

    // Generate JWT
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    // Set cookie
    cookies().set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      error: {
        title: "Server Error",
        message: "An unexpected error occurred"
      }
    };
  }
}
