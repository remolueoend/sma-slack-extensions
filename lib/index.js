
var express = require('express'),
    app = express(),
    routes = {
        command: require('./routes/command')
    };

app.set('port', (process.env.PORT || 8080));

//app.use(express.static(__dirname + '/public'));
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/command', routes.command);

app.use(function (req, res) {
    res.statusCode = 404;
    res.end('not found');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});