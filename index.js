const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    try {
        const response = await axios.post(`${process.env.URL}/api/calculator`, { msg });
        bot.sendMessage(chatId, response.data.message);
    } catch (err) {
        bot.sendMessage(chatId, 'Invalid!')
    }
});