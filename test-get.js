
const axios = require('axios');
require('dotenv').config();

const YESPOS_API_URL = process.env.YESPOS_API_URL || "https://api.yespos.uz/api/v1";
const YESPOS_API_KEY = process.env.YESPOS_API_KEY;

async function testShort() {
    try {
        console.log("--- Attempt 3: GET request ---");
        const res = await axios.get(`${YESPOS_API_URL}/marketplace/products`, {
            headers: { 'API-Key': YESPOS_API_KEY }
        });
        console.log("Success GET:", res.status);
    } catch (e) {
        console.log("Failed GET:", e.response ? e.response.status : e.message);
        if (e.response) console.log("Data:", e.response.data);
    }
}
testShort();
