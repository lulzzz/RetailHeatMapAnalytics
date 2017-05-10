var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next){
  res.render('index.html');
});
//changed
router.get('/past',function(req, res, next){
  res.render('past_analytics.html');
});
router.get('/modal',function(req, res, next){
  res.render('modal.html');
});
module.exports = router;
