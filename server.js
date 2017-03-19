var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Poll = require('./model/polls');

var app = express();
var router = express.Router();
var port = process.env.API_PORT || 3001;

mongoose.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

router.get('/', (req, res) => {
  res.json({message: 'API Initialized!'});
});

router.route('/polls')
  .get(function(req, res) {
    Poll.find((err, polls) => {
      if (err) {
        res.send(err);
      }

      res.json(polls);
    });
  })
  .post(function(req, res) {
    var poll = new Poll();
    poll.ownerId = req.body.ownerId;
    poll.ownerName = req.body.ownerName;
    poll.title = req.body.title;
    poll.options = req.body.options;

    poll.save(err => {
      if (err)
        res.send(err);
      res.json({message: 'Poll successfully added!'});
    });
  });

app.use('/api', router);

app.listen(port, function() {
  console.log(`API running on port ${port}`);
});