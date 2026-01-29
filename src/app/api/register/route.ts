import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { apiHandler } from "@/lib/api-handler";

export const dynamic = 'force-dynamic';

export const POST = apiHandler(async (req: Request) => {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    const exists = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (exists) {
        return new NextResponse("Email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: "USER"
        },
    });

    return NextResponse.json(user);
});
