var express    = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var util = require('util');
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/home.html'));
});

router.get('/api/airlines', function(req, res) {
    request('http://node.locomote.com/code-task/airlines', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json({ message: JSON.parse(body) });
      }
    })
});

router.get('/api/airports', function(req, res) {
    var args = req.query;
    endpoint = util.format('http://node.locomote.com/code-task/airports?q=%s',
  						             args.q);
    request(endpoint, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json({ message: JSON.parse(body) });
      }
    })
});

router.get('/api/search/:id', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  var p_id = req.params.id;
  var args = req.query;
  endpoint = util.format('http://node.locomote.com/code-task/flight_search/%s?date=%s&from=%s&to=%s',
						             p_id.toUpperCase(), args.date.toUpperCase(),
                         args.from.toUpperCase(), args.to.toUpperCase());
  request(endpoint, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json({ message: JSON.parse(body) });
    }
  })

});

// Base Route http://localhost:3000/api/
app.use('/', router);

app.listen(port);
console.log('App Runing on Port ' + port);
