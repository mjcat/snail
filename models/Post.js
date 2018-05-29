'use strict';

const mongoose = require('mongoose');

const post = require('./postSchema');

const TWELVE_HOURS = 60 * 60 * 12;

const PostSchema = new mongoose.Schema(post);

PostSchema.index({ dateCreated: 1 }, { expireAfterSeconds: TWELVE_HOURS });

module.exports = mongoose.model('Post', PostSchema);
