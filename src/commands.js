const Parser = require('rss-parser');
const bot = require('./bot');

const parser = new Parser();

const URL = 'https://pt.gatestoneinstitute.org/articles/rss_pt.xml';
const HELP_TEXT = `
  *Gatestone Institute*
  
  Gatestone Institute, centro de estudos e conselho de política 
  internacional, é uma instituição apartidária, sem fins lucrativos, 
  dedicada a educar o público sobre temáticas que os meios de 
  comunicação em massa deixam de promover:

  - Instituições para Salvaguardar a Democracia e o Estado de Direito
  - Direitos Humanos
  - Uma economia livre e forte
  - Forças armadas capazes de garantir a paz em casa e no mundo livre
  - Independência energética
  - Assegurar que o público esteja informado sobre as ameaças a nossa liberdade individual, soberania e liberdade de expressão.
  
  Use os comandos para obter notícias:
  - latestnews - Busca as útimas cinco notícias
  - help - Ajuda de como utilizar o Bot
  `;


function sendLatestNews(message) {
  const LIMIT = 5;
  parser.parseURL(URL).then(feed => {
    const news = feed.items.length > LIMIT ? feed.items.slice(0, LIMIT) : feed.items;
    const messages = news.map(item => `<a href="${item.link}">${item.title}</a>`);
    messages.forEach(text => bot.sendMessage({ chat_id: message.from.id, text: text, parse_mode: 'HTML' }))
  });
}

function sendHelpMessage (message) {
  bot.sendMessage({ chat_id: message.from.id, text: HELP_TEXT });
}

module.exports = { sendLatestNews, sendHelpMessage };