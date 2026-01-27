import axios from 'axios';

export interface YesPosProduct {
    id: number;
    category: number;
    name: string;
    sku: string;
    image: string;
    description: string;
    price?: number; // Price might not be in the direct product list according to some docs
}

export interface YesPosCategory {
    id: number;
    parent: number;
    name: string;
    image: string;
    description: string;
    products: YesPosProduct[];
}

export async function getYesPosProducts(): Promise<YesPosProduct[]> {
    const YESPOS_API_URL = process.env.YESPOS_API_URL;
    const YESPOS_API_KEY = process.env.YESPOS_API_KEY;

    if (!YESPOS_API_URL || !YESPOS_API_KEY) {
        console.warn("YesPos API credentials are missing.");
        return [];
    }

    try {
        const response = await axios.post(`${YESPOS_API_URL}/marketplace/products`, {}, {
            headers: {
                'API-Key': YESPOS_API_KEY,
                'AppName': 'YesPOS',
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.code === 0 && Array.isArray(response.data.data)) {
            const categories = response.data.data as YesPosCategory[];
            const allProducts: YesPosProduct[] = [];

            categories.forEach(cat => {
                if (cat.products && Array.isArray(cat.products)) {
                    allProducts.push(...cat.products);
                }
            });

            return allProducts;
        }

        console.warn("Unexpected YesPos product response structure:", response.data);
        return [];

    } catch (error: any) {
        if (error.response?.data?.error?.includes("Har 1 daqiqada")) {
            console.error("YesPos Rate Limit: Only 1 request per minute allowed.");
        } else {
            console.error("Failed to fetch YesPos products:", error.response?.data || error.message);
        }
        return [];
    }
}

interface YesPosItem {
    item: number; // Product ID
    qty: number;
    price: number;
}

interface YesPosPayment {
    payment_id: number;
    value: number;
}

interface YesPosOrderPayload {
    type: number; // 1 for Order
    note?: string;
    delivery_info: {
        scheduled_time?: string;
        distance: number;
        delivery_fee: number;
    };
    items: YesPosItem[];
    payments: YesPosPayment[];
}

export async function createYesPosOrder(orderData: any) {
    const YESPOS_API_URL = process.env.YESPOS_API_URL;
    const YESPOS_API_KEY = process.env.YESPOS_API_KEY;

    if (!YESPOS_API_URL || !YESPOS_API_KEY) {
        console.warn("YesPos API credentials are missing.");
        return;
    }

    try {
        const payload: YesPosOrderPayload = {
            type: 1, // Order
            note: `Order from Website #${orderData.id?.slice(-6).toUpperCase() || 'N/A'}`,
            delivery_info: {
                distance: 0,
                delivery_fee: 0,
            },
            items: orderData.items.map((item: any) => ({
                item: parseInt(item.productId) || 0,
                qty: item.quantity,
                price: item.price
            })),
            payments: [
                {
                    payment_id: 1, // Defaulting to Cash/1 as per example, or logic based on orderData.paymentMethod
                    value: orderData.total
                }
            ]
        };

        const response = await axios.post(`${YESPOS_API_URL}/marketplace/order`, payload, {
            headers: {
                'API-Key': YESPOS_API_KEY,
                'AppName': 'YesPOS',
                'Content-Type': 'application/json'
            }
        });

        console.log("YesPos Order Created:", response.data);
        return response.data;

    } catch (error: any) {
        console.error("Failed to create YesPos order:", error.response?.data || error.message);
        return null;
    }
}

export async function createYesPosPayment(amount: number, orderId: string, callbackUrl: string) {
    // Note: The payment endpoints might come from a different base URL or configuration provided by the bank/YesPos.
    // The user example uses "https://api.yespos.uz/payment" which is DIFFERENT from "/api/v1" base.
    // We will assume this is a separate URL or overrideable.
    // For now, let's use the USER PROVIDED hardcoded URL as default or env var if we want flexibility.

    // User provided: const YESPOS_API = "https://api.yespos.uz/payment";
    const PAYMENT_API_URL = "https://api.yespos.uz/payment";
    const YESPOS_API_KEY = process.env.YESPOS_API_KEY;

    if (!YESPOS_API_KEY) {
        throw new Error("YesPos API Key is missing for payment.");
    }

    try {
        const response = await axios.post(
            PAYMENT_API_URL,
            {
                amount: amount,
                order_id: orderId,
                callback_url: callbackUrl
            },
            {
                headers: {
                    Authorization: `Bearer ${YESPOS_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Payment creation failed:", error.response?.data || error.message);
        throw error;
    }
}

