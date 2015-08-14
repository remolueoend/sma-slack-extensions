
var request = require('request'),
    generalUrl = 'https://hooks.slack.com/services/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',
    deployUrl = 'https://hooks.slack.com/services/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';

module.exports = function (req, res) {
    res.end();
    request({
        uri: deployUrl,
        method: 'POST',
        json: { text: 'New Showcase of SMA 2016 available. Check it out on <http://showcase.sma2016.ch>' }
    }, function (err, resp, body) {

    });
};