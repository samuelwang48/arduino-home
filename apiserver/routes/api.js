var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var binary = require('binary');
mongoose.connect('mongodb://localhost/arhome');

var Stream = mongoose.model('Stream', {
  deviceId: String,
  temp: Number,
  humi: Number,
  created: Date
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api', {
    title: 'arduino-home api',
    output: 'get'
  });
});

router.post('/', function(req, res, next) {
  console.log('binary begin');
  console.log(req.body);
  console.log(req.files);
  console.log('binary end');
  var stream = new Stream(req.body);
  stream.save(function (err) {
    if (!err) {
      res.render('api', {
        title: 'arduino-home api',
        output: JSON.stringify(req.body, null, 2)
      });
    }
  });
});
module.exports = router;
