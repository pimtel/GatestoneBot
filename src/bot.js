const { Bot } = require('tgapi');

module.exports = new Bot(process.env.TELEGRAM_TOKEN);