'use server'

import { prisma } from '@/app/lib/db'
import { checkAuth } from '@/app/actions/auth'

export type UpdateSummaryParams = {
    id: number
    userText: string
    summary: string
}

export type UpdateSummaryResponse = {
    success: boolean
    error: {
        title: string
        message: string
    }
}

export async function updateSummary({
    id,
    userText,
    summary
}: UpdateSummaryParams): Promise<UpdateSummaryResponse> {
    try {
        const user = await checkAuth()
        if (!user) {
            return {
                success: false,
                error: {
                    title: 'Authentication Error',
                    message: 'You must be logged in to update summaries'
                }
            }
        }

        // Verify the summary belongs to the user
        const existingSummary = await prisma.summary.findFirst({
            where: {
                id,
                userId: user.id
            }
        })

        if (!existingSummary) {
            return {
                success: false,
                error: {
                    title: 'Not Found',
                    message: 'Summary not found or access denied'
                }
            }
        }

        // Update the summary
        await prisma.summary.update({
            where: { id },
            data: {
                userText,
                summary,
                wordCount: userText.split(/\s+/).length,
                characterCount: userText.length
            }
        })

        return {
            success: true,
            error: {
                title: '',
                message: ''
            }
        }

    } catch (error) {
        console.error('Error updating summary:', error)
        return {
            success: false,
            error: {
                title: 'Server Error',
                message: 'Failed to update summary'
            }
        }
    }
} 