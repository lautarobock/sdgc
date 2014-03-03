var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon("client/images/icon.png"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '../client')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var rootRedirect = function(req, res) {
    res.redirect("html/");
};
app.get("/", rootRedirect);
app.get("/index.html", rootRedirect);

//Connect to Mongoose
require("mongoose").connect(process.env.MONGOLAB_URI);

require("./routes/config").createRoutes(app);

var server = http.createServer(app).listen(app.get('port'), function(){
    // log.info('Express server listening on port ' + app.get('port'));
  console.log('Express server listening on port ' + app.get('port'));
});