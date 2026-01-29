import { prisma } from "../src/lib/db"; // Adjust path as needed based on where script is run. Assuming run from root via tsx
// Actually, imports in scripts usually need care.
// Let's rely on standard tsx execution from root.
// Path to db lib: src/lib/db.ts exists in main app.
// Admin app uses its own lib/db.ts but it points to same DB.
// We will use the main app's lib/db for the script.

import bcrypt from "bcryptjs";

async function createAdmin() {
    console.log("Creating Admin User...");
    const email = "admin@liderbazar.uz";
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            role: "ADMIN",
            password: hashedPassword
        },
        create: {
            email,
            name: "Admin",
            password: hashedPassword,
            role: "ADMIN"
        }
    });

    console.log(`✅ Admin user created/updated: ${user.email}`);
    console.log(`🔑 Password: ${password}`);
}

createAdmin()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
