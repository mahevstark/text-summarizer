import { login, checkAuth, logout } from '../app/actions/auth'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { prisma, setupTestDatabase, cleanupTestDatabase, disconnectTestDatabase } from './helpers/setup'

// Increase timeout
jest.setTimeout(30000);

// Mock next/headers
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  })),
}))

describe('Database and Auth Tests', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  beforeEach(async () => {
    await cleanupTestDatabase();
    
    // Create test users
    await prisma.user.create({
      data: {
        email: 'john@example.com',
        name: 'John Doe',
        password: await bcrypt.hash('password123', 10),
        status: 'active'
      }
    });

    await prisma.user.create({
      data: {
        email: 'jane@example.com',
        name: 'Jane Smith',
        password: await bcrypt.hash('password456', 10),
        status: 'active'
      }
    });

    // Mock the auth cookie for successful login
    const mockCookies = cookies as jest.Mock;
    mockCookies.mockImplementation(() => ({
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    }));
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // Test 1: Database Connection
  describe('Database Connection', () => {
    it('should connect to the database successfully', async () => {
      expect(prisma).toBeDefined()
      const users = await prisma.user.findMany()
      expect(Array.isArray(users)).toBe(true)
    })
  })

  // Test 2: Database Seeding
  describe('Database Seeding', () => {
    it('should have seeded the test users correctly', async () => {
      const users = await prisma.user.findMany()
      expect(users).toHaveLength(2)
      
      const johnDoe = users.find(user => user.email === 'john@example.com')
      const janeSmith = users.find(user => user.email === 'jane@example.com')
      
      expect(johnDoe).toBeDefined()
      expect(janeSmith).toBeDefined()
      expect(johnDoe?.name).toBe('John Doe')
      expect(janeSmith?.name).toBe('Jane Smith')
    })
  })

  // Test 3: Login
  describe('Login Functionality', () => {
    it('should successfully login with correct credentials', async () => {
      // Mock the auth cookie for successful login
      const mockCookies = cookies as jest.Mock
      const mockSet = jest.fn()
      mockCookies.mockImplementation(() => ({
        get: jest.fn(),
        set: mockSet,
        delete: jest.fn(),
      }))

      const response = await login({
        email: 'john@example.com',
        password: 'password123'
      })
      
      expect(response).toHaveProperty('success', true)
      expect(mockSet).toHaveBeenCalledWith('auth-token', expect.any(String), expect.any(Object))
    })

    it('should fail login with incorrect password', async () => {
      const response = await login({
        email: 'john@example.com',
        password: 'wrongpassword'
      })
      
      expect(response).toHaveProperty('error')
      expect(response).toMatchObject({
        error: {
          title: 'Authentication Error',
          message: 'Invalid password',
          field: 'password'
        }
      })
    })

    it('should fail login with non-existent email', async () => {
      const response = await login({
        email: 'nonexistent@example.com',
        password: 'password123'
      })
      
      expect(response).toHaveProperty('error')
      expect(response).toMatchObject({
        error: {
          title: 'Authentication Error',
          message: 'No user found with this email',
          field: 'email'
        }
      })
    })
  })

  // Test 4: Check Auth
  describe('Check Auth Functionality', () => {
    it('should return null when no token is present', async () => {
      const mockCookies = cookies as jest.Mock
      mockCookies.mockImplementation(() => ({
        get: () => undefined,
      }))

      const result = await checkAuth()
      expect(result).toBeNull()
    })

    it('should return user data when valid token is present', async () => {
      const users = await prisma.user.findMany()
      const user = users[0]

      const token = jwt.sign(
        { userId: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'test-secret',
        { expiresIn: '1h' }
      )

      const mockCookies = cookies as jest.Mock
      mockCookies.mockImplementation(() => ({
        get: () => ({ value: token }),
      }))

      const result = await checkAuth()
      expect(result).toBeDefined()
      expect(result?.email).toBe(user.email)
    })
  })

  // Test 5: Logout
  describe('Logout Functionality', () => {
    it('should clear the auth cookie', async () => {
      const mockCookies = cookies as jest.Mock
      const mockDelete = jest.fn()
      
      mockCookies.mockImplementation(() => ({
        delete: mockDelete,
      }))

      await logout()
      expect(mockDelete).toHaveBeenCalledWith('auth-token')
    })
  })
}) 