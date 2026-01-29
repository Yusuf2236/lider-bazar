import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log("🔄 Connecting to database...")
        const categoryCount = await prisma.category.count()
        console.log(`✅ Categories found: ${categoryCount}`)

        const productCount = await prisma.product.count()
        console.log(`✅ Products found: ${productCount}`)

        if (categoryCount > 0) {
            console.log("🚀 Database system is FUNCTIONAL.")
        } else {
            console.error("❌ Database is empty!")
        }
    } catch (e) {
        console.error("❌ Database connection FAILED:", e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
