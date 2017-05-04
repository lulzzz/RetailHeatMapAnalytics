var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  res.render('index.html');
});

router.get('/past',function(req, res, next){
  res.render('past.html');
});

module.exports = router;
