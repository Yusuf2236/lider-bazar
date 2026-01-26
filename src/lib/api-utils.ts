
import { prisma } from '@/lib/db';
import { products as staticProducts, Product } from '@/lib/data';

// Helper to fetch products from DB
export async function getProducts(): Promise<Product[]> {
    try {
        const dbProducts = await prisma.product.findMany({
            include: { category: true }
        });

        return dbProducts.map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            oldPrice: p.oldPrice || undefined,
            image: p.image,
            category: p.category.name,
            rating: p.rating,
            isNew: p.isNew,
            description: p.description || undefined,
            specs: p.specs ? JSON.parse(p.specs) : undefined
        }));
    } catch (e) {
        console.error("Failed to fetch products from DB", e);
        return staticProducts; // Fallback to static data
    }
}
