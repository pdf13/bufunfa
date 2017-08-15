const SlackBot = require('slackbots');

const bot = new SlackBot({
    token: process.env.MELIUZ_BOT_TOKEN || 'xoxb-223533910129-Fz0zGkAgv6VSzPAPA4zGLD70',
    name: 'CircleCIBot'
});

module.exports = bot;
