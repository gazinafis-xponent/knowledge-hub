import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `prisma` to be defined
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;