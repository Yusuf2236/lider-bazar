'use server'

import { prisma } from '@/lib/db'

export async function getOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                items: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        // Transform orders to match the UI component's expected format if needed
        // Or return raw orders and let component handle it. 
        // The component expects: { id, customer, date, total, status, items }

        return orders.map(order => ({
            id: order.id,
            customer: order.user?.name || 'Mijoz',
            date: order.createdAt.toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            total: order.total,
            status: order.status,
            items: order.items.length
        }))
    } catch (error) {
        console.error('Failed to fetch orders:', error)
        return []
    }
}
