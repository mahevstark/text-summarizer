import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  try {
    console.log('Testing database connection...')
    const result = await prisma.$connect()
    console.log('Database connection successful!')
    
    const userCount = await prisma.user.count()
    console.log(`Number of users in database: ${userCount}`)
  } catch (error) {
    console.error('Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 