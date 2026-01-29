
const axios = require('axios');
require('dotenv').config();

const API_KEY = "Lider-4PkqZlKldmsm.JKnknkdsdsds.)9jmmd.QwLrX9b";
const ENDPOINTS = [
    "https://api.yespos.uz/api/v1/marketplace/products",
    "https://api.yespos.uz/api/v1/products",
    "https://api.yespos.uz/api/products",
    "https://api.yespos.uz/v1/marketplace/products",
    "https://api.yespos.uz/marketplace/products"
];

async function runTests() {
    for (const url of ENDPOINTS) {
        console.log(`\nTesting URL: ${url}`);

        // Try POST
        try {
            const res = await axios.post(url, {}, { headers: { 'API-Key': API_KEY, 'AppName': 'YesPOS' } });
            console.log(`[POST] Success! Status: ${res.status}`);
            return; // Stop if success
        } catch (e) {
            console.log(`[POST] Failed: ${e.response ? e.response.status : e.message}`);
        }

        // Try GET
        try {
            const res = await axios.get(url, { headers: { 'API-Key': API_KEY, 'AppName': 'YesPOS' } });
            console.log(`[GET] Success! Status: ${res.status}`);
            return; // Stop if success
        } catch (e) {
            console.log(`[GET] Failed: ${e.response ? e.response.status : e.message}`);
        }
    }
}

runTests();
