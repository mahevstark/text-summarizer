'use server'

import { prisma } from '../../../lib/db'
import { checkAuth } from '../../../actions/auth'

export type DeleteSummaryResponse = {
  success: boolean
  error: {
    title: string
    message: string
  }
}

export async function deleteSummary(id: number): Promise<DeleteSummaryResponse> {
  try {
    const user = await checkAuth()
    if (!user) {
      return {
        success: false,
        error: {
          title: 'Authentication Error',
          message: 'You must be logged in to delete summaries'
        }
      }
    }

    // Delete the summary and verify it belongs to the user
    const deletedSummary = await prisma.summary.deleteMany({
      where: {
        id: id,
        userId: user.id
      }
    })

    if (deletedSummary.count === 0) {
      return {
        success: false,
        error: {
          title: 'Delete Error',
          message: 'Summary not found or you do not have permission to delete it'
        }
      }
    }

    return { success: true, error: { title: '', message: '' } }

  } catch (error) {
    console.error('Error deleting summary:', error)
    return {
      success: false,
      error: {
        title: 'Server Error', 
        message: 'Failed to delete summary'
      }
    }
  }
}
