var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('iot/dashboard');
});

router.get('/history', function(req, res, next) {
  res.render('iot/history');
});

router.get('/alert', function(req, res, next) {
  res.render('iot/alert');
});

router.get('/graph', function(req, res, next) {
  res.render('iot/graph');
});

router.get('/about', function(req, res, next) {
  res.render('iot/about');
});

module.exports = router;
