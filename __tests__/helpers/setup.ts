import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import dotenv from 'dotenv';

// Force loading of .env.test
const envPath = path.resolve(process.cwd(), '.env.test');
dotenv.config({ path: envPath, override: true });

// Ensure we're using the test database URL
// // const DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/text_summarizer_test';
// process.env.DATABASE_URL = DATABASE_URL;
// process.env.DIRECT_URL = DATABASE_URL;  // For test environment, both URLs are the same

// Create a Prisma client for the default database to create the test database
const defaultPrisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL as string
    }
  }
});

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL as string
    }
  }
});

export async function setupTestDatabase() {
  console.log('Setting up test database...');
  try {
    // Create test database if it doesn't exist
    // try {
    //   await defaultPrisma.$executeRawUnsafe('CREATE DATABASE text_summarizer_test;');
    //   console.log('Created test database');
    // } catch (error) {
    //   if (!(error as any).message?.includes('already exists')) {
    //     throw error;
    //   }
    //   console.log('Test database already exists');
    // }

    // Reset and migrate database before all tests
    console.log('Resetting database...');
    execSync('npx prisma migrate reset --force --skip-seed', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: process.env.DIRECT_URL }
    });
    
    console.log('Generating Prisma client...');
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: process.env.DIRECT_URL }
    });
    
    console.log('Pushing schema changes...');
    execSync('npx prisma db push', { 
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: process.env.DIRECT_URL }
    });

    // Verify database connection and schema
    console.log('Verifying database connection...');
    await prisma.$connect();
    
    // Wait for database to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Database setup complete');
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  } finally {
    await defaultPrisma.$disconnect();
  }
}

export async function cleanupTestDatabase() {
  try {
    // Check if tables exist before trying to delete
    const tableExists = async (tableName: string) => {
      try {
        await prisma.$executeRawUnsafe(`SELECT * FROM "${tableName}" LIMIT 1`);
        return true;
      } catch {
        return false;
      }
    };

    // Delete records in the correct order (respecting foreign key constraints)
    if (await tableExists('Summary')) {
      await prisma.summary.deleteMany();
    }
    if (await tableExists('User')) {
      await prisma.user.deleteMany();
    }

    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for cleanup
  } catch (error) {
    console.error('Error cleaning database:', error);
    throw error;
  }
}

export async function disconnectTestDatabase() {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error disconnecting from database:', error);
    throw error;
  }
} 