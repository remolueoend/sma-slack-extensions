var winston = require('winston');

function log(req, res){
    var t = new Date(),
        method = req.method,
        url = req.url;

        winston.info('%d %s %s', res.statusCode, method, url, {timestamp: t});
}

module.exports = function(req, res, next){
    res.on('finish', function(){
        log(req, res);
    });
    next();
};
