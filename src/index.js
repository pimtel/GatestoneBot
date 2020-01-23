const bot = require('./bot');
const { LATEST_NEWS, HELP } = require('./types');
const { sendLatestNews, sendHelpMessage } = require('./commands');

const pollingOptions = { limit: 50, timetout: 50 };
const polling = bot.polling(pollingOptions);

polling.on('message', message => {
  if (!message || message.from.is_bot) return;
  switch (message.text) {
    case LATEST_NEWS:
      sendLatestNews(message);
      break;
    case HELP:
      sendHelpMessage(message);
      break;
    default:
      break;
  }
});
