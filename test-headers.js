
const axios = require('axios');
const API_KEY = "Lider-4PkqZlKldmsm.JKnknkdsdsds.)9jmmd.QwLrX9b";
const URL = "https://api.yespos.uz/api/v1/marketplace/products";

const VARS = [
    { headers: { 'API-Key': API_KEY } },
    { headers: { 'Authorization': `Bearer ${API_KEY}` } },
    { headers: { 'x-api-key': API_KEY } },
    { headers: { 'apikey': API_KEY } },
    { headers: { 'Authorization': API_KEY } }
];

async function testV() {
    for (const v of VARS) {
        console.log(`Testing headers: ${JSON.stringify(v.headers)}`);
        try {
            const res = await axios.post(URL, {}, v);
            console.log("Success! Status:", res.status);
            return;
        } catch (e) {
            console.log("Failed:", e.response ? e.response.status : e.message);
        }
    }
}
testV();
