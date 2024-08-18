var express = require('express');
var router = express.Router();

const mqttController = require('../controllers/mqttTest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('test/main', {topic: process.env.TEST_TOPIC});
});

router.get('/mqtt', function(req, res, next) {
  res.render('test/mqtt');
})

router.post('/publish', (req, res) => {
  const { topic, message } = req.body;
  mqttController.publishMessage(topic, message);
  res.json({ success: true, message: 'Message published' });
});

router.post('/subscribe', (req, res) => {
  const { topic } = req.body;
  mqttController.subscribeTopic(topic);
  res.json({ success: true, message: 'Topic subscribed' });
});

router.get('/swiss', function(req, res, next) {
  res.render('test/swiss');
});

router.get('/graph1', function(req, res, next) {
  res.render('test/graph1');
});

router.get('/graph2', function(req, res, next) {
  res.render('test/graph2');
});

router.get('/history', function(req, res, next) {
  res.render('test/history');
});

module.exports = router;
