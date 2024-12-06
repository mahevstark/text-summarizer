if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

if (!process.env.DIRECT_URL) {
  throw new Error('DIRECT_URL is not defined in environment variables');
}

export const dbConfig = {
  databaseUrl: process.env.DATABASE_URL,
  directUrl: process.env.DIRECT_URL,
} 