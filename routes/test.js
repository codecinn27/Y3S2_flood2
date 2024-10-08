var express = require('express');
var router = express.Router();
var test = require('../controllers/testing');

// const mqttController = require('../controllers/mqttTest');

/* GET users listing. */
router.get('/main', function (req, res, next) {
  res.render('test/main', { topic: process.env.TEST_TOPIC });
});

router.get('/mqtt', function (req, res, next) {
  res.render('test/mqtt');
})

router.get('/swiss', function (req, res, next) {
  res.render('test/swiss');
});

router.get('/graph1', function (req, res, next) {
  res.render('test/graph1');
});

router.get('/graph2', function (req, res, next) {
  res.render('test/graph2');
});

router.get('/history', test.displayDataPerMinute);

router.get('/graph3', function (req, res, next) {
  res.render('test/graph3');
})

router.get('/graph4', function (req, res, next) {
  res.render('test/graph4');
})

router.get('/button', function(req,res,next){
  res.render('test/button');
})

router.get('/button2', function(req,res,next){
  res.render('test/button2');
})

router.get('/button3', function(req,res,next){
  res.render('test/button3');
})

router.get('/button4', function(req,res,next){
  res.render('test/button4');
})

router.get('/popup1', function(req,res,next){
  res.render('test/popup1');
})
module.exports = router;
