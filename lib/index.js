
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var routes = {
        command: require('./routes/command'),
        webhooks: {
            deploybot: require('./routes/webhooks/deploybot')
        }
    };

app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json());

//app.use(express.static(__dirname + '/public'));
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.post('/webhooks/deploybot', routes.webhooks.deploybot);
app.get('/command', routes.command);

app.use(function (req, res) {
    res.statusCode = 404;
    res.end('not found');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});