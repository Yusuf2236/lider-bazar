import { prisma } from '../src/lib/db';
import bcrypt from 'bcryptjs';

async function testRegister() {
    const name = "Test User";
    const email = "test_" + Date.now() + "@example.com";
    const password = "password123";

    console.log("Starting debug registration test...");
    console.log("Email:", email);

    try {
        console.log("Step 1: Checking if user exists...");
        const exists = await prisma.user.findUnique({
            where: { email },
        });
        console.log("User exists:", !!exists);

        console.log("Step 2: Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed successfully.");

        console.log("Step 3: Creating user...");
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "USER"
            },
        });
        console.log("User created successfully:", user.id);
    } catch (error: any) {
        console.error("❌ Registration Test Failed!");
        console.error("Error Message:", error.message);
        console.error("Error Stack:", error.stack);
        if (error.code) console.error("Prisma Error Code:", error.code);
    } finally {
        await prisma.$disconnect();
    }
}

testRegister();
