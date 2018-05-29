'use strict';

const mongoose = require('mongoose');

const post = require('./postSchema');

const PermanentPostSchema = new mongoose.Schema(post);

module.exports = mongoose.model('PermanentPost', PermanentPostSchema);
