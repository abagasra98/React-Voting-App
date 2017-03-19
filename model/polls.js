var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollSchema = new Schema({
  ownerId: Number,
  ownerName: String,
  title: String,
  options: {}
});

module.exports = mongoose.model('Poll', PollsSchema);
