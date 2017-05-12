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
app.get('/about', function(req, res){
    res.sendFile(html_dir +'aboutUS.html');
});
app.get('/modal', function(req, res){
    res.sendFile(html_dir +'modal.html');
});

app.post('/getheatmapdaily',
    heatmap.getdaily
);
app.post('/productCatalog',
    analytics.productCatalog
);

app.post('/postrandom',
    heatmap.postrandom
);

app.post('/getH',
    heatmap.gethourly
);

app.post('/analyticsdaily',
    analytics.getanalyticsdaily);

app.post('/analyticsProduct',
    analytics.getProduct);




app.listen(port, function(){
    console.log('Server started on port '+ port);
});

