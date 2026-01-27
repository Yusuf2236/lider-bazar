import dotenv from 'dotenv';
dotenv.config();

import { getYesPosProducts } from './src/lib/yespos';

async function verifyConnection() {
    console.log("Checking YesPos configuration...");
    const url = process.env.YESPOS_API_URL;
    const key = process.env.YESPOS_API_KEY;

    if (!url || url === "https://api.yespos.uz/api/v1" && !key || key === "YOUR_YESPOS_API_KEY") {
        console.error("❌ ERROR: Real YesPos credentials are missing in .env file.");
        console.log("Please update YESPOS_API_URL and YESPOS_API_KEY in /home/yusuf/LiderBazar/.env");
        return;
    }

    console.log(`URL: ${url}`);
    console.log(`Key: ${key ? "********" + key.slice(-4) : "MISSING"}`);

    console.log("Attempting to fetch products...");
    const products = await getYesPosProducts();

    if (products.length > 0) {
        console.log(`✅ SUCCESS: Connected to YesPos! Found ${products.length} products.`);
    } else {
        console.log("⚠️ CONNECTED, but no products found or API returned empty list.");
        console.log("Check if your YesPos account has products in the Marketplace.");
    }
}

verifyConnection();
