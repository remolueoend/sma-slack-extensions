
var request = require('request'),
    winston = require('winston'),
    generalChannelUrl = 'https://hooks.slack.com/services/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',
    repoChannelUrl = 'https://hooks.slack.com/services/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';

function styleText(comment){
    var result = comment;
    if(typeof comment === 'string' && comment.length){
        var lines = comment.split('\n');
        lines = lines.map(function (l) {
            return l.length ? '• ' + l : '';
        });
        result = lines.join('\n');
    }

    return result;
}

function sendSlackNotification(req, res, commit){
    var attachment = {
        fallback: 'New SMA 2016 Showcase available!',
        pretext: 'New SMA 2016 Showcase available! View it on ' +
        '<http://skylla.zhaw.ch/sma2016/showcase|SMA2016 Showcase>',
        title: 'Changes made:',
        title_link: commit.repository_url,
        text: styleText(commit.comment),
        color: '#7CD197',
        "mrkdwn_in": ["text"]
    };

    res.end();
    request({
        uri: repoChannelUrl,
        method: 'POST',
        json: { attachments: [attachment] }
    }, function (err, resp, body) { });
}

module.exports = function (req, res) {

    var postData = '';
    req.on('data', function (chunk) {
        postData += chunk;
    });

    req.on('end', function () {
        winston.info('Incoming deploybot webhook request:', {reqBody: postData});
        var data = JSON.parse(postData.toString());
        sendSlackNotification(req, res, data);
    });
};