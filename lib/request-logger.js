var winston = require('winston');

function log(req){
    var t = new Date(),
        method = req.method,
        url = req.url;

        winston.info('%s %s', method, url, {timestamp: t});
}

module.exports = function(req, res, next){
    res.on('finish', function(){
        log(req);
    });
    next();
};
