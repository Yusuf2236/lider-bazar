
import "dotenv/config";
import { getYesPosProducts } from "../src/lib/yespos";

async function runTest() {
    console.log("🔍 YESPOS TEST BOSHLANDI (Mahsulotlarni tekshirish)");

    const apiKey = process.env.YESPOS_API_KEY;
    const apiUrl = process.env.YESPOS_API_URL;

    if (!apiKey || !apiUrl) {
        console.log("❌ .env ichida API KEY yoki API URL topilmadi");
        return;
    }

    console.log(`📡 Manzil: ${apiUrl}`);
    console.log(`🔑 Kalit: ${apiKey.substring(0, 5)}...`);

    try {
        const products = await getYesPosProducts();

        if (products && products.length > 0) {
            console.log(`✅ YESPOS ISHLADI! ${products.length} ta mahsulot topildi.`);
            console.log("Birinchi mahsulot:", products[0].name);
        } else {
            console.log("⚠️ Bog'lanish bo'ldi, lekin mahsulotlar ro'yxati bo'sh.");
        }

    } catch (err: any) {
        console.log("❌ YESPOS XATO BERDI");
        console.log("Xabar:", err.message);
    }
}

runTest();
