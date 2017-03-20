var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollsSchema = new Schema({
  ownerId: Number,
  ownerName: String,
  title: String,
  votes: {}
});

module.exports = mongoose.model('Poll', PollsSchema);
