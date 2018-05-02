var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;
mongoose.connect(connect);

var emailSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  first:{
    type: Boolean,
  },
  favorites:{
    type: Object,
    required: false
  }
});



var Email = mongoose.model('Email', emailSchema);
var User = mongoose.model("User", userSchema);
module.exports = {
  Email:Email,
  User: User
}
