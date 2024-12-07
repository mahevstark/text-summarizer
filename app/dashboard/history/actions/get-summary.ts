'use server'

import { prisma } from '@/app/lib/db'
import { checkAuth } from '@/app/actions/auth'
import { endOfDay, startOfDay, subDays } from 'date-fns'

// Keep track of pending request
let currentRequest: AbortController | null = null

export type FilterPeriod = 'Today' | 'Yesterday' | 'Last 7 Days' | 'Last 14 Days' | 'Last 30 Days' | '30-60 Days ago' | '> 60 Days ago'

export type GetSummaryParams = {
  page?: number
  limit?: number
  search?: string
  period?: FilterPeriod
}

export type Summaries = {
  summaries: {
    id: number
    userText: string
    summary: string
    wordCount: number
    characterCount: number
    createdAt: Date
  }[]
  total: number
  hasMore: boolean
  error: {
    title: string
    message: string
  }
}

export async function getSummaries({
  page = 1,
  limit = 5,
  search = '',
  period
}: GetSummaryParams): Promise<Summaries> {
  try {
    // Cancel previous request if exists
    if (currentRequest) {
      currentRequest.abort()
    }

    // Create new abort controller
    currentRequest = new AbortController()
    const signal = currentRequest.signal

    const user = await checkAuth()
    if (!user) {
      return {
        summaries: [],
        total: 0,
        hasMore: false,
        error: {
          title: 'Authentication Error',
          message: 'You must be logged in to view summaries'
        }
      }
    }

    // Calculate date range based on period
    let dateFilter = {}
    if (period) {
      const now = new Date()
      
      switch (period) {
        case 'Today':
          dateFilter = {
            gte: startOfDay(now),
            lte: endOfDay(now)
          }
          break
        case 'Yesterday':
          dateFilter = {
            gte: startOfDay(subDays(now, 1)),
            lte: endOfDay(subDays(now, 1))
          }
          break
        case 'Last 7 Days':
          dateFilter = {
            gte: startOfDay(subDays(now, 7)),
            lte: endOfDay(now)
          }
          break
        case 'Last 14 Days':
          dateFilter = {
            gte: startOfDay(subDays(now, 14)),
            lte: endOfDay(now)
          }
          break
        case 'Last 30 Days':
          dateFilter = {
            gte: startOfDay(subDays(now, 30)),
            lte: endOfDay(now)
          }
          break
        case '30-60 Days ago':
          dateFilter = {
            gte: startOfDay(subDays(now, 60)),
            lte: endOfDay(subDays(now, 30))
          }
          break
        case '> 60 Days ago':
          dateFilter = {
            lte: startOfDay(subDays(now, 60))
          }
          break
      }
    }

    // Build where clause
    const where = {
      userId: user.id,
      ...(search ? {
        OR: [
          { userText: { contains: search, mode: 'insensitive' as const } },
          { summary: { contains: search, mode: 'insensitive' as const } }
        ]
      } : {}),
      ...(Object.keys(dateFilter).length > 0 ? {
        createdAt: dateFilter
      } : {})
    }

    // Check if request was aborted
    if (signal.aborted) {
      throw new Error('Request aborted')
    }

    // Get total count
    const total = await prisma.summary.count({ where })

    // Check if request was aborted
    if (signal.aborted) {
      throw new Error('Request aborted')
    }

    const finalC = {
      where,
      select: {
        id: true,
        userText: true,
        summary: true,
        wordCount: true,
        characterCount: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip: (page - 1) * limit,
      take: limit
    } as any

    console.log("finalC", finalC);
    // Get paginated results
    const summaries = await prisma.summary.findMany(finalC)

    // Clear current request
    currentRequest = null

    return {
      summaries,
      total,
      hasMore: total > page * limit,
      error: {
        title: '',
        message: ''
      }
    }

  } catch (error) {
    // Clear current request
    currentRequest = null

    // Don't report aborted request errors
    if (error instanceof Error && error.message === 'Request aborted') {
      return {
        summaries: [],
        total: 0,
        hasMore: false,
        error: {
          title: '',
          message: ''
        }
      }
    }

    console.error('Error fetching summaries:', error)
    return {
      summaries: [],
      total: 0,
      hasMore: false,
      error: {
        title: 'Server Error',
        message: 'Failed to fetch summaries'
      }
    }
  }
}
