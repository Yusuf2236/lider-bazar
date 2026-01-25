export interface Product {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    rating: number;
    isNew?: boolean;
}

export interface News {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    slug: string;
}

export const categories: Category[] = [
    { id: '1', name: 'Baby Diapers', image: 'https://placehold.co/200x200/png?text=Diapers', slug: 'baby-diapers' },
    { id: '2', name: 'Drinks', image: 'https://placehold.co/200x200/png?text=Drinks', slug: 'drinks' },
    { id: '3', name: 'Bread Products', image: 'https://placehold.co/200x200/png?text=Bread', slug: 'bread' },
    { id: '4', name: 'Grains', image: 'https://placehold.co/200x200/png?text=Grains', slug: 'grains' },
    { id: '5', name: 'Vegetables', image: 'https://placehold.co/200x200/png?text=Vegetables', slug: 'vegetables' },
    { id: '6', name: 'Fruits', image: 'https://placehold.co/200x200/png?text=Fruits', slug: 'fruits' },
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Apple iPhone 15 Pro',
        price: 14500000,
        oldPrice: 15000000,
        image: 'https://placehold.co/400x400/png?text=iPhone+15',
        category: 'Telefonlar',
        rating: 5,
        isNew: true,
    },
    {
        id: '2',
        name: 'Samsung Galaxy S24 Ultra',
        price: 13800000,
        image: 'https://placehold.co/400x400/png?text=S24+Ultra',
        category: 'Telefonlar',
        rating: 4.8,
    },
    {
        id: '3',
        name: 'Artisan Sourdough Bread',
        price: 25000,
        image: 'https://placehold.co/400x400/png?text=Bread',
        category: 'Bread Products',
        rating: 4.9,
        oldPrice: 30000,
    },
    {
        id: '4',
        name: 'Tropical Fruit Basket',
        price: 95000,
        oldPrice: 110000,
        image: 'https://placehold.co/400x400/png?text=Fruits',
        category: 'Fruits',
        rating: 4.9,
    },
    {
        id: '5',
        name: 'PlayStation 5 Slim',
        price: 6700000,
        image: 'https://placehold.co/400x400/png?text=PS5',
        category: 'O\'yin konsollari',
        rating: 5,
    },
];

export const news: News[] = [
    {
        id: '1',
        title: 'Yangi iPhone 15 endi sotuvda!',
        excerpt: 'Lider Bazar do\'konlarida yangi iPhone 15 modellari eng yaxshi narxlarda.',
        date: '2024-01-20',
        image: 'https://placehold.co/600x300/orange/white?text=New+Arrival',
    },
    {
        id: '2',
        title: 'Katta chegirmalar boshlandi',
        excerpt: 'Barcha maishiy texnikalar uchun 20% gacha chegirmalar.',
        date: '2024-01-18',
        image: 'https://placehold.co/600x300/ff6600/white?text=Sale',
    },
];
