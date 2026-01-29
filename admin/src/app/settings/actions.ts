'use server';

import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function createAdminUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        throw new Error("Missing fields");
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    revalidatePath('/settings');
    return { success: true };
}

export async function getAdmins() {
    return await prisma.user.findMany({
        where: { role: 'ADMIN' },
        select: { id: true, name: true, email: true, createdAt: true }
    });
}
