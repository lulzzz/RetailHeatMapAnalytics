var express = require('express');

var bodyParser = require('body-parser');

var index = require('./routes/index');
var heatmap = require('./routes/heatmap');
var analytics = require('./routes/analytics');
var http = require('http');
var path = require('path');

var port =3000;
var app = express();

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
app.post('/getheatmapdaily',heatmap.getdaily);
app.post('/getheatmaphourly',heatmap.gethourly);
app.post('/getheatmapmonthly',heatmap.getmonthly);
app.post('/getheatmapyearly',heatmap.getyearly);
app.post('/heatmapdaily',heatmap.postdaily);

app.post('/getanalyticsdaily',analytics.getdaily);
app.post('/analyticsdaily',analytics.postdaily);



app.listen(port, function(){
  console.log('Server started on port '+ port);
});
