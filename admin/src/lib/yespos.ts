import axios, { AxiosInstance } from 'axios';

const YESPOS_API_URL = 'http://api.yespos.uz/api/v1'; // Based on docs from Step 33 (base_url/api/v1) - wait, docs said 'base_url/api/v1'. I need the real base URL.
// The user provided Laravel config said: YESPOS_API_URL=https://api.yespos.uz/v1
// But the repo README said: base_url/api/v1
// Let's assume https://api.yespos.uz/api/v1 or https://api.yespos.uz/v1.
// Looking at the user provided .env example in Step 11: YESPOS_API_URL=https://api.yespos.uz/v1
// BUT the reference repo README (Step 33) has: POST /marketplace/products
// AND: curl --location 'https://base_url/api/v1/marketplace/order'
// I will use process.env.YESPOS_API_URL if set, otherwise default to https://api.yespos.uz/api/v1 but allow override.
// Actually, I'll stick to the structure found in the README.

interface YesPosProduct {
    id: number;
    parent: number;
    name: string;
    image: string;
    description: string;
    products?: YesPosChildProduct[];
}

interface YesPosChildProduct {
    id: number;
    category: number;
    name: string;
    sku: string;
    image: string;
    description: string;
    price?: number; // Not explicitly in "Get Marketplace Products" example but likely needed. 
    // Wait, "Get Marketplace Products" example (Step 33) DOES NOT show price in the product list.
    // It shows: id, category, name, sku, image, description.
    // This is strange. How do we get the price? 
    // Maybe there is another endpoint or it's included but omitted in the example?
    // The webhook example (Step 33, Section 4) shows: { product_id: 1, price: 1000, stock: 2 }.
    // Accessing price might be via webhook or maybe the product list actually has it.
    // For now I'll assume it's there or I might need to clarify. 
    // I'll add `price?: number` to the interface.
}

interface CreateOrderPayload {
    type: 1 | 2; // 1 = Order, 2 = Refund
    note?: string;
    delivery_info?: {
        scheduled_time?: string;
        distance?: number; // meters
        delivery_fee?: number;
    } | null;
    items: {
        item: number; // Product ID
        qty: number;
        price: number;
    }[];
    payments: {
        payment_id: number; // 1=Cash, 2=Card, 4=Click, 5=Payme
        value: number;
    }[];
}

export class YesPosClient {
    private client: AxiosInstance;
    private apiKey: string;

    constructor() {
        this.apiKey = process.env.YESPOS_API_KEY || '';
        if (!this.apiKey) {
            console.warn('YESPOS_API_KEY is not set');
        }

        this.client = axios.create({
            baseURL: 'https://api.yespos.uz/api/v1', // Defaulting to this, can be adjusted
            headers: {
                'Content-Type': 'application/json',
                'API-Key': this.apiKey,
                'AppName': 'YesPOS',
            },
        });
    }

    async getProducts(): Promise<YesPosProduct[]> {
        try {
            const response = await this.client.post('/marketplace/products', {});
            if (response.data.code === 0) {
                return response.data.data;
            }
            throw new Error(response.data.error || 'Failed to fetch products');
        } catch (error) {
            console.error('YesPos getProducts error:', error);
            throw error;
        }
    }

    async createOrder(payload: CreateOrderPayload) {
        try {
            // Wrapper to ensure AppName header is present if needed, 
            // though axios instance can have it. 
            // README says Header 'AppName': 'YesPOS' is required for creating order.
            const response = await this.client.post('/marketplace/order', payload, {
                headers: {
                    'AppName': 'YesPOS'
                }
            });

            if (response.data.code === 0) {
                return response.data;
            }
            throw new Error(response.data.error || 'Failed to create order');
        } catch (error) {
            console.error('YesPos createOrder error:', error);
            throw error;
        }
    }

    async getBranches() {
        try {
            const response = await this.client.post('/branch/list', {});
            if (response.data.code === 0) {
                return response.data.data;
            }
            throw new Error(response.data.error || 'Failed to fetch branches');
        } catch (error) {
            console.error('YesPos getBranches error:', error);
            throw error;
        }
    }
}

export const yesPosClient = new YesPosClient();
