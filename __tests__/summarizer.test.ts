import { summarize } from '../app/dashboard/actions/summarize'
import { deleteSummary } from '../app/dashboard/history/actions/delete-summary'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { prisma, setupTestDatabase, cleanupTestDatabase, disconnectTestDatabase } from './helpers/setup'

// Increase timeout
jest.setTimeout(30000);

// Mock OpenAI
jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [
            {
              message: {
                content: 'Mocked summary response'
              }
            }
          ]
        })
      }
    }
  }))
})

// Mock next/headers
const mockGet = jest.fn()
const mockSet = jest.fn()
const mockDelete = jest.fn()

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: mockGet,
    set: mockSet,
    delete: mockDelete,
  })),
}))

describe('Summarizer CRUD Operations', () => {
  let testUser: any
  let authToken: string

  beforeAll(async () => {
    await setupTestDatabase();
  });

  beforeEach(async () => {
    await cleanupTestDatabase();
    
    // Create a test user
    testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        password: await bcrypt.hash('password123', 10),
        status: 'active'
      }
    });

    // Create auth token
    authToken = jwt.sign(
      { userId: testUser.id, email: testUser.email, name: testUser.name },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );

    // Reset all mocks
    mockGet.mockReset();
    mockSet.mockReset();
    mockDelete.mockReset();

    // Mock the auth cookie
    mockGet.mockReturnValue({ value: authToken });
  });

  afterAll(async () => {
    await cleanupTestDatabase();
    await disconnectTestDatabase();
  });

  // Test Create Summary
  describe('Create Summary', () => {
    it('should create a new summary', async () => {
      const text = 'This is a test text that needs to be summarized.'
      const response = await summarize(text, null)

      if ('error' in response) {
        throw new Error(`Should not return an error: ${JSON.stringify(response.error)}`)
      }

      expect(response.summary).toBe('Mocked summary response')
      expect(response.savedSummary).toBeDefined()
      expect(response.savedSummary.userText).toBe(text)
      expect(response.savedSummary.wordCount).toBe(10) // Count of words in test text
      expect(response.savedSummary.characterCount).toBe(text.length)
    }, 10000)

    it('should fail to create summary when not authenticated', async () => {
      // Mock no auth token
      mockGet.mockReturnValue(undefined)

      const text = 'This is a test text.'
      const response = await summarize(text, null)

      expect('error' in response).toBe(true)
      if ('error' in response) {
        expect(response.error.title).toBe('Authentication Error')
      }
    })

    it('should fail with empty text', async () => {
      const response = await summarize('', null)

      expect('error' in response).toBe(true)
      if ('error' in response) {
        expect(response.error.title).toBe('Validation Error')
      }
    })
  })

  // Test Update Summary
  describe('Update Summary', () => {
    it('should update an existing summary', async () => {
      // First create a summary
      const initialText = 'Initial text for summary.'
      const createResponse = await summarize(initialText, null)
      
      if ('error' in createResponse) {
        throw new Error(`Should not return an error during creation: ${JSON.stringify(createResponse.error)}`)
      }

      // Then update it
      const updatedText = 'Updated text for summary.'
      const updateResponse = await summarize(updatedText, {
        id: createResponse.savedSummary.id,
        userText: initialText,
        summary: createResponse.summary
      })

      if ('error' in updateResponse) {
        throw new Error(`Should not return an error during update: ${JSON.stringify(updateResponse.error)}`)
      }

      expect(updateResponse.savedSummary.userText).toBe(updatedText)
      expect(updateResponse.savedSummary.id).toBe(createResponse.savedSummary.id)
    }, 10000)
  })

  // Test Delete Summary
  describe('Delete Summary', () => {
    it('should delete an existing summary', async () => {
      // First create a summary
      const text = 'Text to be deleted.'
      const createResponse = await summarize(text, null)
      
      if ('error' in createResponse) {
        throw new Error(`Should not return an error during creation: ${JSON.stringify(createResponse.error)}`)
      }

      // Then delete it
      const deleteResponse = await deleteSummary(createResponse.savedSummary.id)
      expect(deleteResponse.success).toBe(true)

      // Verify it's deleted
      const summary = await prisma.summary.findUnique({
        where: { id: createResponse.savedSummary.id }
      })
      expect(summary).toBeNull()
    }, 10000)

    it('should fail to delete non-existent summary', async () => {
      const response = await deleteSummary(999999)
      expect(response.success).toBe(false)
      expect(response.error.title).toBe('Delete Error')
    })

    it('should fail to delete summary when not authenticated', async () => {
      // Mock no auth token
      mockGet.mockReturnValue(undefined)

      const response = await deleteSummary(1)
      expect(response.success).toBe(false)
      expect(response.error.title).toBe('Authentication Error')
    })
  })

  // Test Read Summary
  describe('Read Summary', () => {
    it('should read all summaries for a user', async () => {
      // Create multiple summaries
      const texts = [
        'First test text.',
        'Second test text.',
        'Third test text.'
      ]

      for (const text of texts) {
        const response = await summarize(text, null)
        if ('error' in response) {
          throw new Error(`Failed to create test summary: ${JSON.stringify(response.error)}`)
        }
      }

      // Read all summaries
      const summaries = await prisma.summary.findMany({
        where: { userId: testUser.id }
      })

      expect(summaries).toHaveLength(texts.length)
      expect(summaries.map(s => s.userText)).toEqual(expect.arrayContaining(texts))
    }, 15000)
  })
}) 