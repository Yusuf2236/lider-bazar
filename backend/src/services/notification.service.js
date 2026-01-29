const axios = require("axios");

exports.notifyTelegram = async (chatId, message) => {
    // Check env vars
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token || !chatId) {
        console.log("Skipping Telegram notification (No token/chatId)", message);
        return;
    }

    try {
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: message
        });
    } catch (e) {
        console.error("Telegram error:", e.message);
    }
};
