const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Poll = require('./model/polls');

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

mongoose.connect(process.env.DB_URL);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'API Initialized!' });
});

router.route('/polls')
  .get((req, res) => {
    Poll.find((err, polls) => {
      if (err) {
        res.send(err);
        return err;
      }

      res.json(polls);
      return polls;
    });
  })
  .post((req, res) => {
    const poll = new Poll();
    poll.ownerId = req.body.ownerId;
    poll.ownerName = req.body.ownerName;
    poll.title = req.body.title;
    poll.votes = req.body.options.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {});

    poll.save(err => {
      if (err)
        res.send(err);
      res.json({message: 'Poll successfully added!'});
    });
  });

router.route('/polls/:poll_id')
  .get(function(req, res) {
    Poll.findById(req.params.poll_id, (err, poll) => {
      if (err)
        res.send(err);
      res.send(poll); // res.json instead?
    });
  })
  .put(function(req, res) {
    Poll.findById(req.params.poll_id, (err, poll) => {
      if (err)
        res.send(err);

      (req.body.title) ? poll.title = req.body.title : null;
      (req.body.votes) ? poll.votes = req.body.votes : null;

        poll.save(err => {
          if (err)
            res.send(err);
          res.json({ message: 'Poll has been successfully updated!' });
        });
    });
  });

app.use('/api', router);

app.listen(port, function() {
  console.log(`API running on port ${port}`);
});
