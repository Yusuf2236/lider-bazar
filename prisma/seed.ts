import { PrismaClient } from '@prisma/client'
import { categories, products } from '../src/lib/data'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...');

    // 1. Seed Categories AND Products
    for (const cat of categories) {
        console.log(`Processing category: ${cat.name}`);

        const createdCategory = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {
                nameUz: cat.nameUz,
                nameRu: cat.nameRu,
            },
            create: {
                id: cat.id,
                name: cat.name,
                nameUz: cat.nameUz,
                nameRu: cat.nameRu,
                image: cat.image,
                slug: cat.slug,
            },
        });

        const categoryProducts = products.filter(p => p.category === cat.name);
        for (const p of categoryProducts) {
            const specsString = p.specs ? JSON.stringify(p.specs) : null;

            await prisma.product.upsert({
                where: { id: p.id },
                update: {
                    description: p.description,
                    descriptionUz: p.descriptionUz,
                    descriptionRu: p.descriptionRu,
                    specs: specsString,
                    price: p.price,
                    oldPrice: p.oldPrice,
                    nameUz: p.nameUz,
                    nameRu: p.nameRu,
                },
                create: {
                    id: p.id,
                    name: p.name,
                    nameUz: p.nameUz,
                    nameRu: p.nameRu,
                    price: p.price,
                    oldPrice: p.oldPrice,
                    image: p.image,
                    description: p.description,
                    descriptionUz: p.descriptionUz,
                    descriptionRu: p.descriptionRu,
                    rating: p.rating,
                    isNew: p.isNew || false,
                    specs: specsString,
                    stock: 100, // Default stock
                    categoryId: createdCategory.id,
                }
            });
        }
    }

    // 2. Create Default Admin User
    await prisma.user.upsert({
        where: { email: 'admin@liderbazar.uz' },
        update: {},
        create: {
            email: 'admin@liderbazar.uz',
            name: 'Admin User',
            role: 'ADMIN',
            // Default password logic would be hashed, but for now simple
            password: 'securepassword',
            // In real app, run bcrypt.hash('securepassword', 10)
        }
    });

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
