
var minimist = require('minimist'),
    fs = require('fs'),
    q = require('deferred'),
    path = require('path'),
    loaded = false;

function loadCommandFiles(){
    var d = q();
    fs.readdir(path.join(__dirname, 'commands'), function(err, files){
        if(err) d.reject(new Error(err));
        else{
            d.resolve(files.filter(function (f) {
                return f !== '.' && f !== '..';
            }));
        }
    });

    return d.promise;
}

function loadCommand(filePath){
    var cmdObj = require('./commands/' + filePath),
        name = '/' + filePath.split('.').slice(0, -1).join('.');
    return {name: name, token: cmdObj[0], handler: cmdObj[1]};
}

var commands = (function () {
    var _commands;

    return function () {
        var d = q();
        if(_commands){
            d.resolve(_commands);
        }else{
            _commands = {};
            loadCommandFiles().then(function (files) {
                files.forEach(function (f) {
                    var cmd = loadCommand(f);
                    _commands[cmd.name] = cmd;
                });
                d.resolve(_commands);
            }, function(err){d.reject(err); }).done();
        }

        return d.promise;
    };

})();

function getCommand(name){
    return commands().then(function (cmds) {
        return cmds[name];
    });
}

module.exports = function(parsedUrl){
    var d = q(),
        query = parsedUrl.query,
        token = query.token,
        argv = query.text ? query.text.split(' ') : [],
        args = minimist(argv),
        name = query.command;

    getCommand(name).then(function (cmd) {
        if(!cmd){
            d.reject(Error('command not found'));
        }else if(cmd.token === token){
            try{
                d.resolve(cmd.handler(args));
            }catch(err){
                d.reject(err);
            }
        }else{
            d.reject(Error('invalid command token'));
        }
    }).done();

    return d.promise;
};