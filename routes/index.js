var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  res.render('index.html');
});

router.get('/past',function(req, res, next){
  res.render('past_analytics.html');
});
router.get('/about',function(req, res, next){
  res.render('aboutUs.html');
});
router.get('/modal',function(req, res, next){
  res.render('modal.html');
});
module.exports = router;
