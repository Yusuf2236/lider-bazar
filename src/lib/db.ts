import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Prioritize Postgres URL over SQLite
const getDbUrl = () => {
    const pgUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
    if (pgUrl && pgUrl.startsWith('postgresql')) {
        return pgUrl;
    }
    return pgUrl; // Fallback to whatever is available
};

const prismaOptions = getDbUrl()
    ? { datasources: { db: { url: getDbUrl() } } }
    : undefined;

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions as any)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
