import { MetadataRoute } from 'next'
import { prisma } from './lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all summaries for sitemap
  const summaries = await prisma.summary.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  })

  // Base routes
  const routes = [
    {
      url: 'https://text-summarizer-lac.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://text-summarizer-lac.vercel.app/login',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://text-summarizer-lac.vercel.app/dashboard',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ]

  // Add dynamic routes for summaries
  const summaryRoutes = summaries.map((summary) => ({
    url: `https://text-summarizer-lac.vercel.app/dashboard/history/${summary.id}`,
    lastModified: summary.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...summaryRoutes]
} 