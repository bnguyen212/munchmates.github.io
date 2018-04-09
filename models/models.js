var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);

var emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});
var Email = mongoose.model('Email', emailSchema);
module.exports = {
  Email:email
}
