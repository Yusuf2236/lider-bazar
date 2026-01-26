
import { prisma } from './src/lib/db';
import bcrypt from 'bcryptjs';

async function main() {
    console.log("Starting registration test...");

    const email = 'test_debug@example.com';
    const password = 'password123';
    const name = 'Debug User';

    // 1. Check if user exists
    console.log("Checking if user exists...");
    const existing = await prisma.user.findUnique({
        where: { email }
    });

    if (existing) {
        console.log("User already exists, deleting...");
        await prisma.user.delete({ where: { email } });
    }

    // 2. Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed.");

    // 3. Create user
    console.log("Creating user...");
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    console.log("User created successfully:", user);
}

main()
    .catch((e) => {
        console.error("ERROR OCCURRED:", e);
        process.exit(1);
    });
