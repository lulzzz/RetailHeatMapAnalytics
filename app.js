var express = require('express');

var bodyParser = require('body-parser');

var index = require('./routes/index');
var heatmap = require('./routes/heatmap');
var analytics = require('./routes/analytics');
var http = require('http');
var path = require('path');

var port =3000;
var app = express();


var Server = require('socket.io');

var server = require('http').Server();

var io = Server(3030);

io.close(); // Close current server

server.listen(3030); // PORT is free to use

io = Server(server);

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

//set static folder for angularjs
app.use(express.static(path.join(__dirname, 'client')))


app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var html_dir = './views/';
app.use('/',index);
app.get('/past', function(req, res){
  res.sendFile(html_dir +'past_analytics.html');
});
app.get('/modal', function(req, res){
  res.sendFile(html_dir +'modal.html');
});

app.post('/getheatmapdaily', function(req, res){
  heatmap.getdaily
});

app.post('/getheatmaphourly', function(req, res){
  heatmap.gethourly
});

app.post('/getheatmapmonthly', function(req, res){
  heatmap.getmonthly
});

app.post('/getheatmapyearly', function(req, res){
  heatmap.getyearly
});

app.post('/heatmapdaily', function(req, res){
  heatmap.postdaily
});

app.post('/getanalyticsdaily', function(req, res){
  analytics.getdaily
});

app.post('/analyticsdaily', function(req, res){
  analytics.postdaily
});

app.post('/analyticsProduct',
    analytics.getProduct);

/*app.post('/getheatmapdaily',heatmap.getdaily);
app.post('/getheatmaphourly',heatmap.gethourly);
app.post('/getheatmapmonthly',heatmap.getmonthly);
app.post('/getheatmapyearly',heatmap.getyearly);
app.post('/heatmapdaily',heatmap.postdaily);

app.post('/getanalyticsdaily',analytics.getdaily);
app.post('/analyticsdaily',analytics.postdaily);
*/


app.listen(port, function(){
  console.log('Server started on port '+ port);
});

