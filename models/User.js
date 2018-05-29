'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  dateCreated: Date,
  dateUpdated: Date,
  email: {
    type: String,
    required: true,
    unique: true,
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
  linkedIn: {
    userId: String,
    profileUrl: String,
    accessToken: String,
    accessExpiresTs: Date,
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
    },
    role: String,
    roleType: {
      type: String,
      enum: ['tr', 'ic', 's', 'm', 'd', 'f'],
    },
    location: String,
    blacklistedCompanies: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      unique: true,
    }],
  },
});

module.exports = mongoose.model('User', UserSchema);
