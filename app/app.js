var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

var http = require('http');
var app = express();

var defaultDir = __dirname + '/server/views/layouts/';
var partialsDir = __dirname + '/server/views/partials/';

app.use(express.static(path.join(__dirname, '../')));

app.set('port', process.env.port || 3000);
app.set('host', process.env.host || 'localhost');

app.set('view engine', '.html');
app.engine('.html', exphbs({
    extname: '.html',
    defaultLayout: defaultDir + 'main'
}));

app.set('views', __dirname + '/server/views/');

require('../app/server/routes/router.js')(app);

http.createServer(app).listen(app.get('port'), app.get('host'), function() {
    console.log('Server start ' + app.get('host') + ':' + app.get('port'));
});
