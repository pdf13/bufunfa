const bot = require('./circleci-slackbot');
const projectChannels = require('./project-channels');

function circleCIController(req, res, next) {
    const data = req.body.payload;
    const channel = projectChannels[data.reponame];
    const colors = { success: 'good', failed: 'danger', canceled: '#464646' }
    const color = colors[data.status] || '#E8E8E8';
    const message = '';
    const pullRequests = formatPullRequests(data.pull_requests);
    const timestamp = generateTimestamp(data.stop_time);

    const params = {
        icon_url: 'http://ilarge.lisimg.com/image/1334778/740full-my-profile.jpg',
        attachments: [
            {
                title: data.subject,
                title_link: data.build_url,
                color,
                text: `Requested by @${ data.user.login }`,
                thumb_url: data.user.avatar_url,
                fields: [
                    { title: 'Project', value: data.reponame, short: true },
                    { title: 'Branch', value: data.branch, short: true },
                    { title: 'Pull Requests', value: pullRequests },
                ],
                footer: 'CircleCI',
                footer_icon: 'http://freevector.co/wp-content/uploads/2013/03/circleci.png',
                ts: timestamp
            }
        ]
    };

    if(channel) { bot.postMessageToChannel(channel, message, params); }

    res.send();
    next();
}

function generateTimestamp(time) {
    const date = new Date(time);
    const timestamp = date.getTime();
    return parseInt(timestamp / 1000);
}

function formatPullRequests(prs) {
    const urls = prs.map(pr => pr.url);
    return urls.join('\n');
}

module.exports = circleCIController;
