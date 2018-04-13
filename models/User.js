var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  linkedInId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
  },
  nickname: String,
  // company: {
  //   type: String,
  // },
  role: {
    type: String,
  },
  roleType: {
    type: String,
  },
  blacklistedCompanies: [],
});

module.exports = mongoose.model('User', UserSchema);
