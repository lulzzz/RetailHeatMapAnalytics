var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var port =3000;
var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

//set static folder for angularjs
app.use(express.static(path.join(__dirname, 'client')))

app.use('/',index);

app.listen(port, function(){
  console.log('Server started on port '+ port);
});
