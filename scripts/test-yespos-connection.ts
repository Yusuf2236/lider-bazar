import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

import { yesPosClient } from '../src/lib/yespos';

async function main() {
    console.log("Testing YesPos Connection...");
    try {
        const products = await yesPosClient.getProducts();
        console.log("Successfully fetched products from YesPos:");
        console.log(`Count: ${products.length}`);
        if (products.length > 0) {
            console.log("First Category Sample:", JSON.stringify(products[0], null, 2));
        }
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

main();
