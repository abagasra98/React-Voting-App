var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollsSchema = new Schema({
  ownerId: Number,
  ownerName: String,
  title: String,
  options: [],
  votes: {} // combine into one JS object, if needed 
});

module.exports = mongoose.model('Poll', PollsSchema);
