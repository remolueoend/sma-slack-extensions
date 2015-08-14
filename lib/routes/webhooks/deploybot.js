
var request = require('request'),
    generalUrl = 'https://hooks.slack.com/services/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',
    deployUrl = 'https://hooks.slack.com/services/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';

module.exports = function (req, res) {
    var comment = req.body.comment,
        repoUrl = req.body.repository_url;

    var attachment = {
        fallback: 'New SMA 2016 Showcase available!',
        pretext: 'New SMA 2016 Showcase available! View it on <http://showcase.sma2016.ch>',
        title: 'Changes made:',
        title_link: repoUrl,
        text: comment,
        color: '#7CD197'
    };

    res.end();
    request({
        uri: deployUrl,
        method: 'POST',
        json: { attachments: [attachment] }
    }, function (err, resp, body) {

    });
};