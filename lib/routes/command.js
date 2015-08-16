
var loader = require('../command-loader'),
    q = require('deferred'),
    url = require('url');

function writeError(res, err){
    res
        .status(400)
        .send(err.toString());
}

function writeResponse(res, response){
    if(q.isPromise(response)){
        response.xthen(function (aRes) {
            writeResponse(res, aRes);
        }, function (err) {
            writeError(res, err);
        });
    }else{
        res.send(response);
    }
}

module.exports = function (req, res) {
    var urlData = url.parse(req.url, true);
    loader(urlData).then(function (resp) {
        writeResponse(res, resp);
    }, function (err) {
        writeError(res, err);
    });
};
