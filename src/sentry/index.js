const bot = require('./sentry-slackbot');
const projectChannels = require('./project-channels');

function sentryController(req, res, next) {
    const data = req.body;
    const channel = projectChannels[data.project];
    const message = '';
    const color = data.level === 'error' ? '#f72600' : '#E8E8E8';
    const params = {
        icon_url: 'http://www.emoticonswallpapers.com/avatar/movies/The-Terminator.jpg',
        attachments: [
            {
                title: data.message,
                title_link: data.url,
                color,
                fields: [
                    { title: 'Project', value: data.project_name, short: true },
                    { title: 'Culprit', value: data.culprit, short: true }
                ],
                footer: 'Sentry',
                footer_icon: 'http://img4.imagetitan.com/img4/small/16/16_sentry-icon.png',
                ts: data.event.received
            }
        ]
    };

    bot.postMessageToChannel(channel, message, params);
    res.send(req.body);
}

module.exports = sentryController;
