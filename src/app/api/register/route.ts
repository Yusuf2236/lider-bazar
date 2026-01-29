import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api-handler";

export const dynamic = 'force-dynamic';

export const POST = apiHandler(async (req: Request) => {
    const { name, email, password } = await req.json();

    if (!password || !name) {
        return new NextResponse("Missing fields (name or password)", { status: 400 });
    }

    if (email) {
        const exists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (exists) {
            return new NextResponse("Email already exists", { status: 400 });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email: email || null, // Ensure empty string becomes null to avoid unique constraint violation
            password: hashedPassword,
            role: "USER"
        },
    });

    return NextResponse.json(user);
});
