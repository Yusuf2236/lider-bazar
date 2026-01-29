export interface Product {
    id: string;
    name: string;
    nameUz?: string;
    nameRu?: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    rating: number;
    isNew?: boolean;
    description?: string;
    descriptionUz?: string;
    descriptionRu?: string;
    specs?: { [key: string]: string };
}

export interface News {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    badge?: string;
    badgeColor?: string;
}

export interface Category {
    id: string;
    name: string;
    nameUz?: string;
    nameRu?: string;
    image: string;
    slug: string;
}

export const categories: Category[] = [
    { id: '1', name: 'Vegetables', nameUz: 'Sabzavot mahsulotlari', nameRu: 'Овощи', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=400', slug: 'vegetables' },
    { id: '2', name: 'Fruits', nameUz: 'Meva mahsulotlari', nameRu: 'Фрукты', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400', slug: 'fruits' },
    { id: '3', name: 'Meat Products', nameUz: 'Go\'sht mahsulotlari', nameRu: 'Мясные продукты', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=400', slug: 'meat' },
    { id: '4', name: 'Cosmetics', nameUz: 'Kosmetika mahsulotlari', nameRu: 'Косметика', image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400', slug: 'cosmetics' },
    { id: '5', name: 'Perfumes', nameUz: 'Parfumeriya mahsulotlari', nameRu: 'Парфюмерия', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400', slug: 'perfumes' },
    { id: '6', name: 'Hygiene', nameUz: 'Gigiyenik mahsulotlar', nameRu: 'Гигиенические товары', image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=400', slug: 'hygiene' },
    { id: '7', name: 'Household', nameUz: 'Uy ishlari mahsulotlari', nameRu: 'Товары для дома', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400', slug: 'household' },
    { id: '8', name: 'Drinks', nameUz: 'Ichimliklar', nameRu: 'Напитки', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400', slug: 'drinks' },
    { id: '9', name: 'Sweets', nameUz: 'Shirinliklar', nameRu: 'Сладости', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&q=80&w=400', slug: 'sweets' },
    { id: '10', name: 'Chocolates', nameUz: 'Shokoladlar', nameRu: 'Шоколад', image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=400', slug: 'chocolates' },
    { id: '11', name: 'Bread', nameUz: 'Non mahsulotlari', nameRu: 'Хлеб', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', slug: 'bread' },
    { id: '12', name: 'Flour', nameUz: 'Unlar', nameRu: 'Мука', image: 'https://images.unsplash.com/photo-1622668516768-077ae1517c27?auto=format&fit=crop&q=80&w=400', slug: 'flour' },
    { id: '13', name: 'Diapers', nameUz: 'Tagliklar', nameRu: 'Подгузники', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400', slug: 'diapers' },
    { id: '14', name: 'Stationery', nameUz: 'Kansovar', nameRu: 'Канцелярия', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=400', slug: 'stationery' },
    { id: '15', name: 'Baby Food', nameUz: 'Bolalar ozuqasi', nameRu: 'Детское питание', image: 'https://images.unsplash.com/photo-1594142106060-64fa79f4c391?auto=format&fit=crop&q=80&w=400', slug: 'baby-food' },
    { id: '16', name: 'Salads', nameUz: 'Salatlar', nameRu: 'Салаты', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', slug: 'salads' },
    { id: '17', name: 'Grains', nameUz: 'Donli mahsulotlar', nameRu: 'Крупы', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400', slug: 'grains' },
    { id: '18', name: 'Oils', nameUz: 'Yog\'lar', nameRu: 'Масла', image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&q=80&w=400', slug: 'oils' },
    { id: '19', name: 'Tea', nameUz: 'Choylar', nameRu: 'Чай', image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400', slug: 'tea' },
    { id: '20', name: 'Sausages', nameUz: 'Kolbasa mahsulotlari', nameRu: 'Колбасные изделия', image: 'https://images.unsplash.com/photo-1597935749479-72c0576395b2?auto=format&fit=crop&q=80&w=400', slug: 'sausages' },
    { id: '21', name: 'Canned Food', nameUz: 'Konservalar', nameRu: 'Консервы', image: 'https://images.unsplash.com/photo-1584281350027-463ae02c710f?auto=format&fit=crop&q=80&w=400', slug: 'canned-food' },
    { id: '22', name: 'Dairy', nameUz: 'Sut va sut mahsulotlari', nameRu: 'Молочные продукты', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=400', slug: 'dairy' },
    { id: '23', name: 'Semi-finished', nameUz: 'Yarim tayyor mahsulotlar', nameRu: 'Полуфабрикаты', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400', slug: 'semi-finished' },
    { id: '24', name: 'Pastries', nameUz: 'Pishiriq va desertlar', nameRu: 'Выпечка и десерты', image: 'https://images.unsplash.com/photo-1559599189-fe84eea4eb1e?auto=format&fit=crop&q=80&w=400', slug: 'pastries' },
    { id: '25', name: 'Preserves', nameUz: 'Asal, murabbo, shirin konservalar', nameRu: 'Варенье, мед', image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&q=80&w=400', slug: 'preserves' },
    { id: '26', name: 'Spices', nameUz: 'Ziravorlar', nameRu: 'Специи', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400', slug: 'spices' },
    { id: '27', name: 'Coffee', nameUz: 'Kofe', nameRu: 'Кофе', image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80&w=400', slug: 'coffee' },
    { id: '28', name: 'Eggs', nameUz: 'Tuxum', nameRu: 'Яйца', image: 'https://images.unsplash.com/photo-1582722878654-02fd23747037?auto=format&fit=crop&q=80&w=400', slug: 'eggs' },
    { id: '29', name: 'Gifts', nameUz: 'Sovg\'alar', nameRu: 'Подарки', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400', slug: 'gifts' },
    { id: '30', name: 'Religious', nameUz: 'Joynomoz va kitoblar', nameRu: 'Религиозные товары', image: 'https://images.unsplash.com/photo-1600813735165-42bf9eb5b791?auto=format&fit=crop&q=80&w=400', slug: 'religious' },
    { id: '31', name: 'Air Fresheners', nameUz: 'Osvejitellar', nameRu: 'Освежители', image: 'https://images.unsplash.com/photo-1588616422325-132d7515dbe3?auto=format&fit=crop&q=80&w=400', slug: 'fresheners' },
    { id: '32', name: 'Watches', nameUz: 'Soatlar', nameRu: 'Часы', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400', slug: 'watches' },
    { id: '33', name: 'Toys', nameUz: 'O\'yinchoqlar', nameRu: 'Игрушки', image: 'https://images.unsplash.com/photo-1566576912902-1d6db6b8d5a2?auto=format&fit=crop&q=80&w=400', slug: 'toys' },
    { id: '34', name: 'Cases', nameUz: 'Chexollar', nameRu: 'Чехлы', image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=400', slug: 'cases' },
    { id: '35', name: 'Magnets', nameUz: 'Magnitlar', nameRu: 'Магниты', image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=400', slug: 'magnets' },
    { id: '36', name: 'Inks', nameUz: 'Printer ranglari', nameRu: 'Чернила', image: 'https://images.unsplash.com/photo-1616499370260-485b3e5ed653?auto=format&fit=crop&q=80&w=400', slug: 'inks' },
    { id: '37', name: 'Packages', nameUz: 'Paketlar', nameRu: 'Пакеты', image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=400', slug: 'packages' },
    { id: '38', name: 'Diet', nameUz: 'Dieta mahsulotlari', nameRu: 'Диетические продукты', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', slug: 'diet' },
    { id: '39', name: 'Receipts', nameUz: 'Chek qog\'ozlar', nameRu: 'Чековая бумага', image: 'https://images.unsplash.com/photo-1628191010376-78ef9d9b68eb?auto=format&fit=crop&q=80&w=400', slug: 'receipts' },
    { id: '40', name: 'Bags', nameUz: 'Sumkalar', nameRu: 'Сумки', image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=400', slug: 'bags' },
    { id: '41', name: 'Cleaning', nameUz: 'Tozalash vositalari', nameRu: 'Чистящие средства', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400', slug: 'cleaning' },
    { id: '42', name: 'Dental', nameUz: 'Tish pasta va shotkalar', nameRu: 'Зубная паста и щетки', image: 'https://images.unsplash.com/photo-1559591937-e1dc37715011?auto=format&fit=crop&q=80&w=400', slug: 'dental' },
    { id: '43', name: 'Disposable', nameUz: 'Bir martalik idishlar', nameRu: 'Одноразовая посуда', image: 'https://images.unsplash.com/photo-1533038590840-1cde6b468958?auto=format&fit=crop&q=80&w=400', slug: 'disposable' },
];

export const products: Product[] = [
    // 1. Vegetables (existing items + new)
    { id: 'v1', name: 'Pomidor', nameUz: 'Pomidor', nameRu: 'Помидоры', price: 15000, oldPrice: 18000, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.8, description: 'Fresh tomatoes', descriptionUz: 'Yangi pomidorlar', descriptionRu: 'Свежие помидоры', specs: { 'Origin': 'Local' } },
    { id: 'v2', name: 'Bodring', nameUz: 'Bodring', nameRu: 'Огурцы', price: 12000, oldPrice: 15000, image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=600', category: 'Vegetables', rating: 4.7, description: 'Fresh cucumbers', descriptionUz: 'Yangi bodringlar', descriptionRu: 'Свежие огурцы', specs: { 'Origin': 'Local' } },

    // 2. Fruits
    { id: 'f1', name: 'Olma', nameUz: 'Olma', nameRu: 'Яблоки', price: 12000, oldPrice: 16000, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600', category: 'Fruits', rating: 4.8, description: 'Sweet red apples', descriptionUz: 'Shirin qizil olmalar', descriptionRu: 'Сладкие красные яблоки', specs: { 'Origin': 'Local' } },

    // 3. Meat
    { id: 'm1', name: '🥩 Mol go\'shti', nameUz: 'Mol go\'shti (lahm)', nameRu: 'Говядина', price: 85000, oldPrice: 95000, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600', category: 'Meat Products', rating: 5.0, description: 'Fresh beef meat', descriptionUz: 'Yangi mol go\'shti', descriptionRu: 'Свежая говядина', specs: { 'Weight': '1kg' } },

    // 4. Cosmetics
    { id: 'c1', name: 'Nivea Creme', nameUz: 'Nivea Kremi', nameRu: 'Крем Nivea', price: 35000, oldPrice: 42000, image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600', category: 'Cosmetics', rating: 4.8, description: 'Moisturizing cream', descriptionUz: 'Namlantiruvchi krem', descriptionRu: 'Увлажняющий крем', specs: { 'Volume': '150ml' } },

    // 5. Perfumes
    { id: 'p1', name: 'Chanel No 5', nameUz: 'Chanel No 5', nameRu: 'Chanel No 5', price: 1500000, oldPrice: 1800000, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600', category: 'Perfumes', rating: 5.0, description: 'Classic perfume', descriptionUz: 'Klassik atir', descriptionRu: 'Классические духи', specs: { 'Volume': '50ml' } },

    // 6. Hygiene
    { id: 'h1', name: 'Dove Soap', nameUz: 'Dove Sovuni', nameRu: 'Мыло Dove', price: 12000, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600', category: 'Hygiene', rating: 4.7, description: 'Moisturizing bar soap', descriptionUz: 'Namlantiruvchi sovun', descriptionRu: 'Увлажняющее мыло', specs: { 'Weight': '100g' } },

    // 7. Household
    { id: 'hh1', name: 'Ariel Powder', nameUz: 'Ariel Kir Yuvish Kukuni', nameRu: 'Порошок Ariel', price: 45000, image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=600', category: 'Household', rating: 4.8, description: 'Washing powder', descriptionUz: 'Kir yuvish kukuni', descriptionRu: 'Стиральный порошок', specs: { 'Weight': '3kg' } },

    // 8. Drinks
    { id: 'd1', name: 'Coca-Cola 1.5L', nameUz: 'Coca-Cola 1.5L', nameRu: 'Coca-Cola 1.5L', price: 12000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600', category: 'Drinks', rating: 4.8, description: 'Sparkling drink', descriptionUz: 'Gazli ichimlik', descriptionRu: 'Газированный напиток', specs: { 'Volume': '1.5L' } },

    // 9. Sweets
    { id: 's1', name: 'Choco Pie', nameUz: 'Choco Pie', nameRu: 'Choco Pie', price: 25000, image: 'https://images.unsplash.com/photo-1630360610496-6a5d45d4c947?auto=format&fit=crop&q=80&w=600', category: 'Sweets', rating: 4.9, description: 'Chocolate bun', descriptionUz: 'Shokoladli pechenye', descriptionRu: 'Шоколадное печенье', specs: { 'Pack': '12 pcs' } },

    // 10. Chocolates
    { id: 'ch1', name: 'Snickers', nameUz: 'Snickers', nameRu: 'Snickers', price: 8000, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=600', category: 'Chocolates', rating: 4.8, description: 'Chocolate bar', descriptionUz: 'Shokoladli baton', descriptionRu: 'Шоколадный батончик', specs: { 'Weight': '50g' } },

    // 11. Bread
    { id: 'br1', name: 'Tandir Non', nameUz: 'Tandir Non', nameRu: 'Лепешка', price: 4000, image: 'https://images.unsplash.com/photo-1589139178465-950c44365859?auto=format&fit=crop&q=80&w=600', category: 'Bread', rating: 5.0, description: 'Uzbek bread', descriptionUz: 'Tandir non', descriptionRu: 'Узбекская лепешка', specs: { 'Type': 'Tandir' } },

    // 12. Flour
    { id: 'fl1', name: 'Un 2kg', nameUz: 'Un 2kg', nameRu: 'Мука 2кг', price: 18000, image: 'https://images.unsplash.com/photo-1622668516768-077ae1517c27?auto=format&fit=crop&q=80&w=600', category: 'Flour', rating: 4.7, description: 'Wheat flour', descriptionUz: 'Bug\'doy uni', descriptionRu: 'Пшеничная мука', specs: { 'Weight': '2kg' } },

    // 13. Diapers
    { id: 'dp1', name: 'Pampers 4', nameUz: 'Pampers 4', nameRu: 'Pampers 4', price: 160000, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600', category: 'Diapers', rating: 4.8, description: 'Baby diapers', descriptionUz: 'Bolalar tagliklari', descriptionRu: 'Детские подгузники', specs: { 'Count': '52' } },

    // 14. Stationery
    { id: 'st1', name: 'Daftar', nameUz: 'Daftar (48 varaq)', nameRu: 'Тетрадь (48 л)', price: 4000, image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=600', category: 'Stationery', rating: 4.5, description: 'Notebook', descriptionUz: 'Daftar katak', descriptionRu: 'Тетрадь в клетку', specs: { 'Pages': '48' } },

    // 15. Baby Food
    { id: 'bf1', name: 'Nestle Porridge', nameUz: 'Nestle Bo\'tqasi', nameRu: 'Каша Nestle', price: 35000, image: 'https://images.unsplash.com/photo-1594142106060-64fa79f4c391?auto=format&fit=crop&q=80&w=600', category: 'Baby Food', rating: 4.9, description: 'Baby porridge', descriptionUz: 'Bolalar bo\'tqasi', descriptionRu: 'Детская каша', specs: { 'Weight': '400g' } },

    // 16. Salads
    { id: 'sl1', name: 'Koreyscha Sabzi', nameUz: 'Koreyscha Sabzi', nameRu: 'Морковча', price: 15000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', category: 'Salads', rating: 4.8, description: 'Carrot salad', descriptionUz: 'Sabzi salati', descriptionRu: 'Морковный салат', specs: { 'Weight': '500g' } },

    // 17. Grains
    { id: 'gr1', name: 'Guruch Lazer', nameUz: 'Guruch Lazer', nameRu: 'Рис Лазер', price: 25000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600', category: 'Grains', rating: 4.9, description: 'Lazer rice', descriptionUz: 'Lazer guruchi', descriptionRu: 'Рис Лазер', specs: { 'Weight': '1kg' } },

    // 18. Oils
    { id: 'ol1', name: 'Kungaboqar Yog\'i', nameUz: 'Kungaboqar Yog\'i', nameRu: 'Подсолнечное Масло', price: 18000, image: 'https://images.unsplash.com/photo-1474979266404-7cadd259c308?auto=format&fit=crop&q=80&w=600', category: 'Oils', rating: 4.7, description: 'Sunflower oil', descriptionUz: 'Kungaboqar yog\'i', descriptionRu: 'Подсолнечное масло', specs: { 'Volume': '1L' } },

    // 19. Tea
    { id: 't1', name: 'Ahmad Tea', nameUz: 'Ahmad Choy', nameRu: 'Чай Ahmad', price: 25000, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600', category: 'Tea', rating: 4.8, description: 'Black tea', descriptionUz: 'Qora choy', descriptionRu: 'Черный чай', specs: { 'Weight': '200g' } },

    // 20. Sausages
    { id: 'sg1', name: 'Doktorskaya', nameUz: 'Doktorskaya Kolbasa', nameRu: 'Колбаса Докторская', price: 65000, image: 'https://images.unsplash.com/photo-1597935749479-72c0576395b2?auto=format&fit=crop&q=80&w=600', category: 'Sausages', rating: 4.7, description: 'Boiled sausage', descriptionUz: 'Pishgan kolbasa', descriptionRu: 'Вареная колбаса', specs: { 'Weight': '1kg' } },

    // 21. Canned Food
    { id: 'cf1', name: 'Makalla', nameUz: 'Makalla (Baliq)', nameRu: 'Скумбрия', price: 15000, image: 'https://images.unsplash.com/photo-1584281350027-463ae02c710f?auto=format&fit=crop&q=80&w=600', category: 'Canned Food', rating: 4.6, description: 'Canned fish', descriptionUz: 'Baliq konservasi', descriptionRu: 'Рыбные консервы', specs: { 'Type': 'Fish' } },

    // 22. Dairy
    { id: 'dr1', name: 'Sut 3.2%', nameUz: 'Musaffo Sut 3.2%', nameRu: 'Молоко 3.2%', price: 12000, image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600', category: 'Dairy', rating: 4.9, description: 'Milk', descriptionUz: 'Sut', descriptionRu: 'Молоко', specs: { 'Volume': '1L' } },

    // 23. Semi-finished
    { id: 'sf1', name: 'Pelmen', nameUz: 'Chuchvara', nameRu: 'Пельмени', price: 40000, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600', category: 'Semi-finished', rating: 4.7, description: 'Dumplings', descriptionUz: 'Chuchvara', descriptionRu: 'Пельмени', specs: { 'Weight': '1kg' } },

    // 24. Pastries
    { id: 'ps1', name: 'Napilyon', nameUz: 'Napilyon Torti', nameRu: 'Торт Наполеон', price: 80000, image: 'https://images.unsplash.com/photo-1559599189-fe84eea4eb1e?auto=format&fit=crop&q=80&w=600', category: 'Pastries', rating: 4.9, description: 'Napoleon cake', descriptionUz: 'Napilyon torti', descriptionRu: 'Торт Наполеон', specs: { 'Type': 'Cake' } },

    // 25. Preserves
    { id: 'pr1', name: 'Malina Murabbo', nameUz: 'Malinali Murabbo', nameRu: 'Малиновое Варенье', price: 35000, image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&q=80&w=600', category: 'Preserves', rating: 4.9, description: 'Raspberry jam', descriptionUz: 'Malinali murabbo', descriptionRu: 'Малиновое варенье', specs: { 'Weight': '350g' } },

    // 26. Spices
    { id: 'sp1', name: 'Murch', nameUz: 'Qora Murch', nameRu: 'Черный Перец', price: 5000, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600', category: 'Spices', rating: 4.8, description: 'Black pepper', descriptionUz: 'Qora murch', descriptionRu: 'Черный перец', specs: { 'Weight': '50g' } },

    // 27. Coffee
    { id: 'co1', name: 'Jacobs', nameUz: 'Jacobs Monarch', nameRu: 'Jacobs Monarch', price: 45000, image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&q=80&w=600', category: 'Coffee', rating: 4.7, description: 'Instant coffee', descriptionUz: 'Eruvchan kofe', descriptionRu: 'Растворимый кофе', specs: { 'Weight': '100g' } },

    // 28. Eggs
    { id: 'eg1', name: 'Tuxum (30)', nameUz: 'Tuxum (30 dona)', nameRu: 'Яйца (30 шт)', price: 45000, image: 'https://images.unsplash.com/photo-1582722878654-02fd23747037?auto=format&fit=crop&q=80&w=600', category: 'Eggs', rating: 4.8, description: 'Chicken eggs', descriptionUz: 'Tovuq tuxumi', descriptionRu: 'Куриные яйца', specs: { 'Count': '30' } },

    // 29. Gifts
    { id: 'gf1', name: 'Gift Box', nameUz: 'Sovg\'a To\'plami', nameRu: 'Подарочный Набор', price: 150000, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', category: 'Gifts', rating: 5.0, description: 'Gift set', descriptionUz: 'Sovg\'a to\'plami', descriptionRu: 'Подарочный набор', specs: { 'Type': 'Mixed' } },

    // 30. Religious
    { id: 'rl1', name: 'Joynomoz', nameUz: 'Joynomoz', nameRu: 'Молельный коврик', price: 80000, image: 'https://images.unsplash.com/photo-1600813735165-42bf9eb5b791?auto=format&fit=crop&q=80&w=600', category: 'Religious', rating: 5.0, description: 'Prayer mat', descriptionUz: 'Joynomoz', descriptionRu: 'Молельный коврик', specs: { 'Origin': 'Turkey' } },

    // 31. Air Fresheners
    { id: 'af1', name: 'Air Wick', nameUz: 'Air Wick', nameRu: 'Air Wick', price: 30000, image: 'https://images.unsplash.com/photo-1588616422325-132d7515dbe3?auto=format&fit=crop&q=80&w=600', category: 'Air Fresheners', rating: 4.6, description: 'Air freshener', descriptionUz: 'Havo tozalagich', descriptionRu: 'Освежитель воздуха', specs: { 'Scent': 'Lavender' } },

    // 32. Watches
    { id: 'wa1', name: 'Devor Soati', nameUz: 'Devor Soati', nameRu: 'Настенные Часы', price: 120000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600', category: 'Watches', rating: 4.7, description: 'Wall clock', descriptionUz: 'Devor soati', descriptionRu: 'Настенные часы', specs: { 'Type': 'Wall' } },

    // 33. Toys
    { id: 'ty1', name: 'Lego', nameUz: 'Lego Konstruktor', nameRu: 'Конструктор Lego', price: 250000, image: 'https://images.unsplash.com/photo-1566576912902-1d6db6b8d5a2?auto=format&fit=crop&q=80&w=600', category: 'Toys', rating: 5.0, description: 'Building blocks', descriptionUz: 'Konstruktor', descriptionRu: 'Конструктор', specs: { 'Age': '6+' } },

    // 34. Cases
    { id: 'cs1', name: 'iPhone Case', nameUz: 'iPhone 15 Chexol', nameRu: 'Чехол iPhone 15', price: 50000, image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=600', category: 'Cases', rating: 4.8, description: 'Phone case', descriptionUz: 'Telefon g\'ilofi', descriptionRu: 'Чехол для телефона', specs: { 'Model': 'iPhone 15' } },

    // 35. Magnets
    { id: 'mg1', name: 'Toshkent Magnit', nameUz: 'Toshkent Magniti', nameRu: 'Магнит Ташкент', price: 15000, image: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=600', category: 'Magnets', rating: 4.5, description: 'Fridge magnet', descriptionUz: 'Muzlatgich magniti', descriptionRu: 'Магнит на холодильник', specs: { 'Type': 'Souvenir' } },

    // 36. Inks
    { id: 'ik1', name: 'Epson Ink', nameUz: 'Epson Ranglari', nameRu: 'Чернила Epson', price: 80000, image: 'https://images.unsplash.com/photo-1616499370260-485b3e5ed653?auto=format&fit=crop&q=80&w=600', category: 'Inks', rating: 4.8, description: 'Printer ink', descriptionUz: 'Printer bo\'yog\'i', descriptionRu: 'Чернила для принтера', specs: { 'Color': 'Black' } },

    // 37. Packages
    { id: 'pk1', name: 'Paket', nameUz: 'Paket (100 dona)', nameRu: 'Пакеты (100 шт)', price: 20000, image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&q=80&w=600', category: 'Packages', rating: 4.6, description: 'Plastic bags', descriptionUz: 'Sellofan paketlar', descriptionRu: 'Целлофановые пакеты', specs: { 'Size': 'Medium' } },

    // 38. Diet
    { id: 'dt1', name: 'Protein Bar', nameUz: 'Protein Baton', nameRu: 'Протеиновый Батончик', price: 25000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600', category: 'Diet', rating: 4.8, description: 'Protein snack', descriptionUz: 'Proteinli tamaddi', descriptionRu: 'Протеиновый перекус', specs: { 'Protein': '20g' } },

    // 39. Receipts
    { id: 'rc1', name: 'Chek Lenta', nameUz: 'Chek Lentasi 80mm', nameRu: 'Чековая Лента 80мм', price: 8000, image: 'https://images.unsplash.com/photo-1628191010376-78ef9d9b68eb?auto=format&fit=crop&q=80&w=600', category: 'Receipts', rating: 4.9, description: 'Thermal paper', descriptionUz: 'Termo qog\'oz', descriptionRu: 'Термобумага', specs: { 'Width': '80mm' } },

    // 40. Bags
    { id: 'bg1', name: 'Eco Bag', nameUz: 'Eko Sumka', nameRu: 'Эко Сумка', price: 15000, image: 'https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&q=80&w=600', category: 'Bags', rating: 4.8, description: 'Reusable bag', descriptionUz: 'Qayta ishlatiladigan sumka', descriptionRu: 'Многоразовая сумка', specs: { 'Material': 'Cotton' } },

    // 41. Cleaning
    { id: 'cl1', name: 'Domestos', nameUz: 'Domestos', nameRu: 'Domestos', price: 25000, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600', category: 'Cleaning', rating: 4.7, description: 'Toilet cleaner', descriptionUz: 'Hojatxona tozalagich', descriptionRu: 'Чистящее средство для утаза', specs: { 'Volume': '1L' } },

    // 42. Dental
    { id: 'dn1', name: 'Colgate', nameUz: 'Colgate 100ml', nameRu: 'Colgate 100мл', price: 15000, image: 'https://images.unsplash.com/photo-1559591937-e1dc37715011?auto=format&fit=crop&q=80&w=600', category: 'Dental', rating: 4.8, description: 'Toothpaste', descriptionUz: 'Tish pastasi', descriptionRu: 'Зубная паста', specs: { 'Volume': '100ml' } },

    // 43. Disposable
    { id: 'ds1', name: 'Plastik Stakan', nameUz: 'Plastik Stakan (50)', nameRu: 'Пластиковые Стаканы (50)', price: 10000, image: 'https://images.unsplash.com/photo-1533038590840-1cde6b468958?auto=format&fit=crop&q=80&w=600', category: 'Disposable', rating: 4.6, description: 'Disposable cups', descriptionUz: 'Bir martalik stakanlar', descriptionRu: 'Одноразовые стаканы', specs: { 'Count': '50' } },
];

export const news: News[] = [
    {
        id: '1',
        title: 'Yangi iPhone 15 endi sotuvda!',
        excerpt: 'Lider Bazar do\'konlarida yangi iPhone 15 modellari eng yaxshi narxlarda.',
        date: '2024-01-20',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
        badge: 'New Arrival',
        badgeColor: '#fbbf24', // Amber/Gold
    },
    {
        id: '2',
        title: 'Katta chegirmalar boshlandi',
        excerpt: 'Barcha maishiy texnikalar uchun 20% gacha chegirmalar.',
        date: '2024-01-18',
        image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=800',
        badge: 'Big Sale',
        badgeColor: '#ef4444', // Red
    },
];
