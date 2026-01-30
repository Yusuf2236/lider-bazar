import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db'; // Corrected import
import { yesPosClient } from '@/lib/yespos';

// Simple slugify if lodash is missing
function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export async function POST() {
    try {
        const yesPosProducts = await yesPosClient.getProducts();
        let stats = { categories: 0, products: 0 };

        // yesPosProducts is an array of Categories, which contain products
        for (const categoryData of yesPosProducts) {
            // Sync Category
            // Generate unique slug
            let catSlug = slugify(categoryData.name);
            // Check if slug exists? Prisma upsert with unique slug might fail if we blindly use name
            // But we have externalId.

            // Strategy: First try to find by externalId
            const existingCategory = await prisma.category.findUnique({
                where: { externalId: String(categoryData.id) }
            });

            // Use existing slug if available, otherwise generate new one (and ensure uniqueness if creating)
            // For simplicity, if creating, we try slugify. If it fails due to unique constraint, we might need random suffix.
            if (!existingCategory) {
                // Check if slug taken
                const slugTaken = await prisma.category.findUnique({ where: { slug: catSlug } });
                if (slugTaken) {
                    catSlug = `${catSlug}-${Date.now()}`;
                }
            }

            const category = await prisma.category.upsert({
                where: { externalId: String(categoryData.id) },
                update: {
                    name: categoryData.name,
                    image: categoryData.image || '',
                },
                create: {
                    externalId: String(categoryData.id),
                    name: categoryData.name,
                    slug: existingCategory ? existingCategory.slug : catSlug, // Wait, create needs slug.
                    image: categoryData.image || '',
                }
            });
            stats.categories++;

            if (categoryData.products && Array.isArray(categoryData.products)) {
                for (const prodData of categoryData.products) {
                    // Sync Product
                    let prodSlug = slugify(prodData.name); // Not used in schema? 
                    // Wait, Product schema does NOT have slug?
                    // Let's check schema in step 38.
                    // model Product { ... name String, ... slug String? NO. No slug in Product? }
                    // Category has slug. Product has NO slug. Ok.

                    await prisma.product.upsert({
                        where: { externalId: String(prodData.id) },
                        update: {
                            name: prodData.name,
                            categoryId: category.id,
                            image: prodData.image || '',
                            description: prodData.description || '',
                            price: prodData.price || 0, // Assuming price exists
                            // stock? YesPos seems to have stock in webhook, but maybe not in this specific list endpoint?
                            // If missing, default to 0 or keep existing.
                        },
                        create: {
                            externalId: String(prodData.id),
                            name: prodData.name,
                            categoryId: category.id,
                            image: prodData.image || '',
                            description: prodData.description || '',
                            price: prodData.price || 0,
                            stock: 100, // Default stock as we might not get it from product list
                        }
                    });
                    stats.products++;
                }
            }
        }

        return NextResponse.json({ success: true, stats });
    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
