const _ = require('lodash');
const Schema = require('mongoose').Schema;

const messageSchema = {
  dateCreated: Date,
  dateModified: Date,
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  previous: [String],
  votes: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    laughs: { type: Number, default: 0 },
  },
};

module.exports = {
  ...messageSchema,
  title: String,
  blacklistedCompanies: [{
    type: Schema.ObjectId,
    ref: 'Company',
  }],
  participatingCompanies: [{
    type: Schema.ObjectId,
    ref: 'Company',
  }],
  comments: [messageSchema],
};
