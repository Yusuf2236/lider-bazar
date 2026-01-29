import "dotenv/config";
import axios from "axios";

async function runPaymentTest() {
    console.log("🚀 Testing YES POS Payment Integration...");

    const YESPOS_API_URL = process.env.YESPOS_API_URL;
    const YESPOS_API_KEY = process.env.YESPOS_API_KEY;
    const MERCHANT_ID = process.env.YESPOS_MERCHANT_ID || process.env.YESPOS_SHOP_ID;

    // Mock Order Data
    const mockOrder = {
        id: "test_order_" + Date.now(),
        total: 1000,
        return_url: "https://liderbazar.uz/success",
        cancel_url: "https://liderbazar.uz/cancel"
    };

    const payload = {
        merchant_id: MERCHANT_ID,
        amount: mockOrder.total,
        order_id: mockOrder.id,
        return_url: mockOrder.return_url,
        cancel_url: mockOrder.cancel_url,
        description: `Order #${mockOrder.id.slice(-6).toUpperCase()}`
    };

    console.log(`📦 Creating Mock Order: ${mockOrder.id}, Amount: ${mockOrder.total}`);
    console.log(`📡 Sending to: ${YESPOS_API_URL}`);
    console.log("Payload:", payload);

    try {
        const response = await axios.post(`${YESPOS_API_URL}`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${YESPOS_API_KEY}`
            }
        });
        console.log("✅ Payment Request SUCCESS!");
        console.log("Response:", JSON.stringify(response.data, null, 2));
    } catch (error: any) {
        console.log("❌ Payment Request FAILED");
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.log("Error:", error.message);
        }
    }
}

runPaymentTest();
