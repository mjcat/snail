'use strict';

const _ = require('lodash');
const Boom = require('boom');
const debug = require('debug')('snailed:posts');

const posts = require('../../lib/posts');

const handler = {};

handler.getAll = async (req, res) => {
  debug('getAll');

  const userId = req.user.id;

  if (!userId) {
    throw Boom.badRequest('No user id');
  }

  try {
    const allPosts = await posts.getAll(userId);

    res.json({ allPosts });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('Get posts error');
  }
};

handler.getOne = async (req, res) => {
  debug('getOne');

  const userId = req.user.id;
  const postHash = req.params.postId;

  if (!userId) {
    throw Boom.badRequest('No user id');
  }
  if (!postHash) {
    throw Boom.badRequest('No post id');
  }

  try {
    const post = await posts.getOne(userId, postHash);
    
    res.json({ post });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('Get one post error');
  }
};

handler.create = async (req, res) => {
  debug('create');

  const userId = req.user.id;
  const post = req.body.post;

  if (!userId) {
    throw Boom.badRequest('No user id');
  }
  if (!post || !post.text) {
    throw Boom.badRequest('No valid post');
  }

  try {
    const result = await posts.create(userId, post);
    
    res.json({ result });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('New post error');
  }
};

handler.comment = async (req, res) => {
  debug('comment');

  const userId = req.user.id;
  const postHash = req.body.postId;
  const comment = req.body.comment;

  if (!userId) {
    throw Boom.badRequest('No user id');
  }
  if (!postHash) {
    throw Boom.badRequest('No post id');
  }
  if (!comment || !comment.text) {
    throw Boom.badRequest('No valid comment');
  }

  try {
    const result = await posts.comment(userId, postHash, comment);
    
    res.json({ result });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('Comment error');
  }
};

handler.vote = async (req, res) => {
  debug('vote');

  const userId = req.user.id;
  const postHash = req.body.postId;
  const type = req.body.type;
  const commentNumber = req.body.commentNumber;

  if (!userId) {
    throw Boom.badRequest('No user id');
  }
  if (!postHash) {
    throw Boom.badRequest('No post id');
  }
  if (!type) {
    throw Boom.badRequest('No valid vote type');
  }

  try {
    const result = await posts.vote(userId, postHash, type, commentNumber);
    
    res.json({ result });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('Vote error');
  }
}

module.exports = handler;
