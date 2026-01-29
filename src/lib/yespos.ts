import axios from 'axios';

// ⚠️ YES POS DOES NOT SUPPORT PRODUCT SYNC
// We only use YES POS for payments.

export interface YesPosProduct {
    // Legacy support to avoid breaking imports elsewhere
    id: number;
    name: string;
    price: number;
}

export async function getYesPosProducts(): Promise<YesPosProduct[]> {
    console.warn("getYesPosProducts called but YES POS has no catalog. Returning empty list.");
    return [];
}

export async function createYesPosOrder(orderData: any) {
    // User requested specifically "YESPOS_API_URL=https://api.yespos.uz/api/v1/payment" in the prompt
    // We will assume the env var might contain the full path or we append if needed.
    // To be safe and flexible, let's check.
    let YESPOS_API_URL = process.env.YESPOS_API_URL;
    const YESPOS_API_KEY = process.env.YESPOS_API_KEY;
    const MERCHANT_ID = process.env.YESPOS_MERCHANT_ID || process.env.YESPOS_SHOP_ID;

    if (!YESPOS_API_URL || !YESPOS_API_KEY) {
        throw new Error("YesPos API credentials are missing.");
    }

    // If the URL doesn't end with /payment and doesn't explicitly look like a full method URL, 
    // we might want to append /payment as per the user's latest prompt snippet.
    // However, the user's prompt snippet 1 showed "YESPOS_API_URL=https://api.yespos.uz/api/v1/payment".
    // I will use it as is, trusting the user will update the .env or I will update it.

    if (!MERCHANT_ID) {
        throw new Error("YESPOS_MERCHANT_ID or YESPOS_SHOP_ID is missing.");
    }

    try {
        // User provided structure in simplified prompt:
        // {
        //   merchant_id: MERCHANT_ID,
        //   amount: orderData.total,
        //   order_id: orderData.id,
        //   return_url: orderData.return_url,
        //   cancel_url: orderData.cancel_url,
        //   description: ...
        // }

        const payload = {
            merchant_id: MERCHANT_ID,
            amount: orderData.total,
            order_id: orderData.id,
            return_url: orderData.return_url || "https://liderbazar.uz/profile", // Default fallback
            cancel_url: orderData.cancel_url || "https://liderbazar.uz/checkout", // Default fallback
            description: `Order #${orderData.id.slice(-6).toUpperCase()}`
        };

        console.log(`[YesPos] Sending Payment Request to ${YESPOS_API_URL}:`, payload);

        const response = await axios.post(YESPOS_API_URL, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${YESPOS_API_KEY}`
            }
        });

        console.log("YesPos Payment Response:", response.data);
        return response.data;

    } catch (error: any) {
        console.error("Failed to create YesPos payment:", error.response?.data || error.message);
        // Throwing error allows the API route to handle it and return 500 to frontend
        throw error;
    }
}

