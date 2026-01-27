
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
    { id: '1', name: 'Baby Diapers', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400', slug: 'baby-diapers' },
    { id: '2', name: 'Drinks', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', slug: 'drinks' },
    { id: '3', name: 'Bread Products', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', slug: 'bread' },
    { id: '4', name: 'Grains', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400', slug: 'grains' },
    { id: '5', name: 'Vegetables', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=400', slug: 'vegetables' },
    { id: '6', name: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400', slug: 'fruits' },
];

const products = [
    // Baby Diapers
    { id: 'bd1', name: 'Pampers Premium Care 1', price: 180000, oldPrice: 200000, image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 4.9, isNew: true, description: 'Softest comfort and best skin protection from Pampers. 5-star skin protection.', specs: { 'Size': '1 (Newborn)', 'Count': '80 pcs', 'Origin': 'Poland' } },
    { id: 'bd2', name: 'Huggies Elite Soft 2', price: 195000, image: 'https://images.unsplash.com/photo-1558230559-679ce681ff57?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 4.8, description: 'Contains 100% organic cotton. Hypoallergenic and breathable.', specs: { 'Size': '2 (3-6kg)', 'Count': '66 pcs', 'Origin': 'Russia' } },
    { id: 'bd3', name: 'Meries Baby Diapers S', price: 210000, oldPrice: 230000, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 4.7, description: 'Premium Japanese quality diapers with exceptional breathability.', specs: { 'Size': 'S (4-8kg)', 'Count': '82 pcs', 'Origin': 'Japan' } },
    { id: 'bd4', name: 'Pampers Pants 4', price: 160000, image: 'https://images.unsplash.com/photo-1563205856-4c7403567793?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 4.6, description: 'Easy on, easy off pants. 360 fit for active babies.', specs: { 'Size': '4 (9-15kg)', 'Count': '52 pcs', 'Origin': 'Turkey' } },
    { id: 'bd5', name: 'Libero Comfort 3', price: 155000, image: 'https://images.unsplash.com/photo-1562947157-558256e25d40?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 4.5, description: 'Dermatologically tested. Lotion free.', specs: { 'Size': '3 (5-9kg)', 'Count': '60 pcs', 'Origin': 'Sweden' } },
    { id: 'bd6', name: 'Eco-Friendly Diapers', price: 250000, image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 5.0, isNew: true, description: 'Biodegradable bamboo diapers. Gentle on skin and planet.', specs: { 'Size': 'M', 'Count': '40 pcs', 'Material': 'Bamboo' } },
    { id: 'bd7', name: 'Night Time Diapers', price: 190000, image: 'https://images.unsplash.com/photo-1549488827-0cfd695b2140?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 4.8, description: 'Extra absorbency for up to 12 hours of dry sleep.', specs: { 'Size': 'L', 'Count': '48 pcs', 'Type': 'Night' } },
    { id: 'bd8', name: 'Newborn Starter Pack', price: 120000, oldPrice: 140000, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600', category: 'Baby Diapers', rating: 4.9, description: 'Perfect starter kit for new parents. Includes wipes.', specs: { 'Size': 'NB', 'Count': '30 pcs', 'Extras': 'Wipes' } },

    // Drinks
    { id: 'dr1', name: 'Coca-Cola 1.5L', price: 12000, oldPrice: 14000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.8, description: 'Classic sparkling soft drink. Best served ice cold.', specs: { 'Volume': '1.5 L', 'Sugar': 'Yes', 'Origin': 'Uzbekistan' } },
    { id: 'dr2', name: 'Pepsi 1.5L', price: 11500, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.7, description: 'Bold, refreshing taste of Pepsi.', specs: { 'Volume': '1.5 L', 'Sugar': 'Yes', 'Origin': 'Uzbekistan' } },
    { id: 'dr3', name: 'Fanta Orange 1.5L', price: 12000, image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.6, description: 'Fruity orange taste. Made with fruit juice.', specs: { 'Volume': '1.5 L', 'Flavor': 'Orange', 'Origin': 'Uzbekistan' } },
    { id: 'dr4', name: 'Natural Mineral Water', price: 3000, image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.9, description: 'Pure mountain spring water.', specs: { 'Volume': '0.5 L', 'Type': 'Still', 'Origin': 'Tian Shan' } },
    { id: 'dr5', name: 'Orange Juice 100%', price: 25000, oldPrice: 32000, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.9, description: '100% natural orange juice without added sugar.', specs: { 'Volume': '1 L', 'Brand': 'Rich', 'Origin': 'Russia' } },
    { id: 'dr6', name: 'Apple Juice', price: 22000, image: 'https://images.unsplash.com/photo-1573500814966-2613ce91a5e1?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.7, description: 'Clarified apple nectar.', specs: { 'Volume': '1 L', 'Brand': 'Bliss', 'Origin': 'Uzbekistan' } },
    { id: 'dr7', name: 'Red Bull Energy', price: 18000, image: 'https://images.unsplash.com/photo-1598460677112-25e40e4f8d4f?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.8, isNew: true, description: 'Vitalizes body and mind.', specs: { 'Volume': '250 ml', 'Caffeine': 'Yes', 'Origin': 'Austria' } },
    { id: 'dr8', name: 'Iced Tea Lemon', price: 9000, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.5, description: 'Refreshing tea drink with lemon flavor.', specs: { 'Volume': '1 L', 'Brand': 'FuseTea', 'Flavor': 'Lemon' } },
    { id: 'dr9', name: 'Green Tea Bottle', price: 7000, image: 'https://images.unsplash.com/photo-1627464082269-e91024bd3540?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.6, description: 'Cold brewed green tea without sugar.', specs: { 'Volume': '0.5 L', 'Sugar': 'No', 'Type': 'Green' } },
    { id: 'dr10', name: 'Cold Coffee Latte', price: 15000, image: 'https://images.unsplash.com/photo-1579308104593-47055c57fba3?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.8, description: 'Ready to drink chilled latte.', specs: { 'Volume': '250 ml', 'Brand': 'Starbucks', 'Type': 'Latte' } },

    // Bread Products
    { id: 'br1', name: 'Non (Traditional Bread)', price: 4000, image: 'https://images.unsplash.com/photo-1589139178465-950c44365859?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 5.0, description: 'Freshly baked traditional Uzbek flatbread.', specs: { 'Weight': '400g', 'Type': 'Tandir', 'Origin': 'Local' } },
    { id: 'br2', name: 'Sliced White Bread', price: 6000, image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 4.5, description: 'Soft white bread, perfect for sandwiches.', specs: { 'Weight': '500g', 'Sliced': 'Yes', 'Brand': 'Burs' } },
    { id: 'br3', name: 'Whole Wheat Bread', price: 8000, oldPrice: 10000, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 4.8, description: 'Healthy whole grain bread rich in fiber.', specs: { 'Weight': '400g', 'Grain': 'Whole Wheat', 'Dietary': 'High Fiber' } },
    { id: 'br4', name: 'Baguette', price: 5000, image: 'https://images.unsplash.com/photo-1595828859239-2fe49e7b233e?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 4.7, description: 'Crispy French style baguette.', specs: { 'Weight': '250g', 'Style': 'French', 'Baking': 'Daily' } },
    { id: 'br5', name: 'Croissant Butter', price: 12000, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 4.9, isNew: true, description: 'Flaky, buttery croissants made with real butter.', specs: { 'Pack': '2 pcs', 'Filling': 'None', 'Type': 'Butter' } },
    { id: 'br6', name: 'Rye Bread', price: 9000, image: 'https://images.unsplash.com/photo-1533464731170-ae40417fc94e?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 4.6, description: 'Dense, dark rye bread with caraway seeds.', specs: { 'Weight': '450g', 'Grain': 'Rye', 'Style': 'Borodinsky' } },
    { id: 'br7', name: 'Burger Buns (4pcs)', price: 10000, image: 'https://images.unsplash.com/photo-1553185368-80f2dff171a8?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 4.5, description: 'Soft sesame topped buns for burgers.', specs: { 'Count': '4 pcs', 'Topping': 'Sesame', 'Use': 'Burgers' } },
    { id: 'br8', name: 'Garlic Bread', price: 8500, image: 'https://images.unsplash.com/photo-1573140247632-f84660f67627?auto=format&fit=crop&q=80&w=600', category: 'Bread Products', rating: 4.8, description: 'Baguette with garlic butter and herbs.', specs: { 'Weight': '300g', 'Flavor': 'Garlic & Herb', 'Ready': 'To Heat' } },

    // Grains
    { id: 'gr1', name: 'Rice Laser (1kg)', price: 22000, oldPrice: 25000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.9, description: 'Premium Laser rice for perfect pilaf.', specs: { 'Weight': '1 kg', 'Type': 'Laser', 'Origin': 'Xorazm' } },
    { id: 'gr2', name: 'Buckwheat (Grechka)', price: 14000, image: 'https://images.unsplash.com/photo-1590390886546-51203b860292?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.7, description: 'High quality roasted buckwheat kernels.', specs: { 'Weight': '900g', 'Type': 'Roasted', 'Origin': 'Russia' } },
    { id: 'gr3', name: 'Pasta Spaghetti', price: 11000, image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.6, description: 'Durum wheat semolina spaghetti.', specs: { 'Weight': '500g', 'Type': 'Spaghetti', 'Cooking Time': '9 min' } },
    { id: 'gr4', name: 'Oats (Hercules)', price: 9000, image: 'https://images.unsplash.com/photo-1584511652496-c65d63327d85?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.8, description: 'Rolled oats for healthy breakfast porridge.', specs: { 'Weight': '400g', 'Type': 'Rolled', 'Cook': '5 min' } },
    { id: 'gr5', name: 'Red Lentils', price: 18000, image: 'https://images.unsplash.com/photo-1518970408542-a169b2b781b0?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.7, description: 'Quick cooking split red lentils.', specs: { 'Weight': '800g', 'Type': 'Split Red', 'Use': 'Soups' } },
    { id: 'gr6', name: 'Chickpeas (Noxat)', price: 20000, image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.6, description: 'Large chickpeas for Hummus and Plov.', specs: { 'Weight': '1 kg', 'Size': 'Large', 'Origin': 'Uzbekistan' } },
    { id: 'gr7', name: 'Basmati Rice Premium', price: 35000, oldPrice: 40000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 5.0, isNew: true, description: 'Extra long grain aromatic Basmati rice.', specs: { 'Weight': '1 kg', 'Type': 'Basmati', 'Origin': 'Pakistan' } },
    { id: 'gr8', name: 'Wheat Flour (2kg)', price: 15000, image: 'https://images.unsplash.com/photo-1622668516768-077ae1517c27?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.8, description: 'All-purpose white wheat flour.', specs: { 'Weight': '2 kg', 'Grade': 'Highest', 'Use': 'Baking' } },
    { id: 'gr9', name: 'Corn Flour', price: 12000, image: 'https://images.unsplash.com/photo-1616738920141-86ae486bd291?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.5, description: 'Fine yellow corn flour.', specs: { 'Weight': '800g', 'Type': 'Corn', 'Gluten Free': 'Yes' } },
    { id: 'gr10', name: 'Barley', price: 8000, image: 'https://images.unsplash.com/photo-1586554523971-d64cb207c425?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.6, description: 'Pearl barley for soups and stews.', specs: { 'Weight': '900g', 'Type': 'Pearl', 'Cooking': '40 min' } },

    // Vegetables
    { id: 'vg1', name: 'Organic Tomatoes', price: 15000, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.8, description: 'Sweet and juicy vine-ripened tomatoes.', specs: { 'Weight': '1 kg', 'Variety': 'Vine', 'Origin': 'Greenhouse' } },
    { id: 'vg2', name: 'Fresh Cucumbers', price: 12000, image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.7, description: 'Crisp, short cucumbers ideal for salads.', specs: { 'Weight': '1 kg', 'Type': 'Short', 'Texture': 'Crunchy' } },
    { id: 'vg3', name: 'Potatoes', price: 6000, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.6, description: 'Large potatoes suitable for frying or mashing.', specs: { 'Weight': '1 kg', 'Variety': 'Yellow', 'Origin': 'Local' } },
    { id: 'vg4', name: 'Red Onions', price: 5000, image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.5, description: 'Sweet red onions for salads and cooking.', specs: { 'Weight': '1 kg', 'Color': 'Red', 'Taste': 'Mild' } },
    { id: 'vg5', name: 'Carrots', price: 4000, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.7, description: 'Sweet and crunchy carrots, washed.', specs: { 'Weight': '1 kg', 'Washed': 'Yes', 'Origin': 'Zarafshan' } },
    { id: 'vg6', name: 'Bell Peppers Mix', price: 25000, oldPrice: 30000, image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.9, description: 'Mix of red, yellow, and green bell peppers.', specs: { 'Weight': '1 kg', 'Colors': 'Mixed', 'Taste': 'Sweet' } },
    { id: 'vg7', name: 'Broccoli', price: 18000, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.8, isNew: true, description: 'Fresh green broccoli heads.', specs: { 'Weight': '1 kg', 'Freshness': 'Daily', 'Origin': 'Local' } },
    { id: 'vg8', name: 'Garlic Pack', price: 3000, image: 'https://images.unsplash.com/photo-1615477093268-b80c2aec3c73?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.9, description: 'Aromatic garlic bulbs mesh pack.', specs: { 'Count': '3 bulbs', 'Origin': 'China', 'Shelf Life': '3 months' } },
    { id: 'vg9', name: 'Fresh Spinach', price: 8000, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.8, description: 'Young spinach leaves, washed and ready to eat.', specs: { 'Weight': '200g', 'Pack': 'Bag', 'Washed': 'Yes' } },
    { id: 'vg10', name: 'Eggplant', price: 10000, image: 'https://images.unsplash.com/photo-1615485925694-a0397ae0344d?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.6, description: 'Glossy purple eggplants.', specs: { 'Weight': '1 kg', 'Shape': 'Long', 'Origin': 'Greenhouse' } },
    { id: 'vg11', name: 'Zucchini', price: 7000, image: 'https://images.unsplash.com/photo-1596350389363-22f3068e4c76?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.7, description: 'Fresh green zucchini squash.', specs: { 'Weight': '1 kg', 'Skin': 'Thin', 'Origin': 'Local' } },
    { id: 'vg12', name: 'Cauliflower', price: 15000, image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3d54?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.8, description: 'Dense white cauliflower heads.', specs: { 'Unit': '1 head', 'Approx Wt': '800g', 'Freshness': 'High' } },

    // Fruits
    { id: 'fr1', name: 'Fresh Bananas', price: 15000, image: 'https://images.unsplash.com/photo-1571771894821-ad9958a3f747?auto=format&fit=crop&q=80&w=600', category: 'Fruits', rating: 4.8, description: 'Sweet and ripe yellow bananas.' },
    { id: 'fr2', name: 'Red Apples', price: 12000, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600', category: 'Fruits', rating: 4.7, description: 'Crispy and sweet red apples.' },
];

async function main() {
    console.log('Seeding database...');

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {
                name: cat.name,
                image: cat.image
            },
            create: {
                id: cat.id,
                name: cat.name,
                image: cat.image,
                slug: cat.slug
            }
        });
        console.log(`Synced category: ${cat.name}`);
    }

    for (const product of products) {
        // Need to find category ID by name essentially, or we assumed IDs match.
        // In data.ts we don't have cat ID in product, but we have category name.
        // In this seed script, let's look up category by name to get the ID.
        // Oh wait, products in data.ts have `category: 'Baby Diapers'`, matching category name.

        const category = categories.find(c => c.name === product.category);
        if (!category) {
            console.warn(`Category not found for product ${product.name}: ${product.category}`);
            continue;
        }

        await prisma.product.upsert({
            where: { id: product.id },
            update: {
                name: product.name,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
                description: product.description,
                rating: product.rating,
                isNew: product.isNew,
                stock: 100, // Default stock
                categoryId: category.id,
                specs: product.specs ? JSON.stringify(product.specs) : null
            },
            create: {
                id: product.id,
                name: product.name,
                price: product.price,
                oldPrice: product.oldPrice,
                image: product.image,
                description: product.description,
                rating: product.rating,
                isNew: product.isNew,
                stock: 100, // Default stock
                categoryId: category.id,
                specs: product.specs ? JSON.stringify(product.specs) : null
            }
        });
        console.log(`Synced product: ${product.name}`);
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
