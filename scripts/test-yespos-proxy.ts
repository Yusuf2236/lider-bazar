
import axios from 'axios';
// @ts-ignore
import { HttpsProxyAgent } from 'https-proxy-agent';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// List of potential proxies (Publicly available, stability not guaranteed)
const PROXIES = [
    'http://47.251.52.222:80', // US
    'http://159.203.84.241:3128', // DigitalOcean
    'http://209.79.65.131:8080',
    'http://167.172.189.204:3128',
    'http://64.225.4.29:33333',
    'http://138.68.60.8:8080',
    'http://206.189.157.23:80'
];

const API_KEY = process.env.YESPOS_API_KEY;

async function testWithProxy() {
    console.log('--- TESTING WITH PROXY FULL LIST ---');

    for (const proxyUrl of PROXIES) {
        console.log(`\nTesting Proxy: ${proxyUrl}`);
        const agent = new HttpsProxyAgent(proxyUrl);

        try {
            const response = await axios({
                method: 'POST',
                url: 'https://api.yespos.uz/api/v1/marketplace/products',
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                    'API-Key': API_KEY,
                    'AppName': 'YesPOS'
                },
                httpsAgent: agent,
                timeout: 5000 // 5 seconds timeout
            });

            console.log(`STATUS: ${response.status}`);
            if (response.status === 200 || response.status === 400 || response.status === 401) {
                console.log('!!! SUCCESS !!!');
                console.log(`Working Proxy Found: ${proxyUrl}`);
                console.log('Data:', JSON.stringify(response.data).substring(0, 100));
                return; // Stop after finding one working proxy
            } else {
                console.log(`Server returned status: ${response.status} (Likely still blocked or internal error)`);
            }

        } catch (error: any) {
            console.log(`Proxy Failed (${proxyUrl}): ${error.message}`);
        }
    }
    console.log('\n--- ALL PROXIES FAILED ---');
    console.log('Try finding a fresh proxy list from https://free-proxy-list.net/');
}

testWithProxy();
