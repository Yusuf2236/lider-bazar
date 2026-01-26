import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Ensure absolute path for SQLite relative to the admin root
// We know dev.db is in the parent directory (LiderBazar/dev.db)
// admin app is in LiderBazar/admin
const cwd = process.cwd();
const dbPath = path.join(cwd, '..', 'dev.db');

export const prisma = globalForPrisma.prisma ?? (() => {
    // In dev mode with Next.js, cwd might be different depending on where it's launched.
    // However, since we launch from admin folder, .. should be correct.
    const adapter = new PrismaBetterSqlite3({
        url: 'file:' + dbPath
    });
    return new PrismaClient({ adapter });
})()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
