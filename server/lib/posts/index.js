'use strict';

const _ = require('lodash');
const crypto = require('crypto');
const debug = require('debug')('snailed:lib:posts');
const moment = require('moment');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const User = require('../../../models/User');
const Post = require('../../../models/Post');
const PermanentPost = require('../../../models/PermanentPost');

const postsLib = {};

/************** Main ******************/

/**
 *  Gets an array of all posts user can access with hashed ids
 *  User can access all posts they created (ownedPosts)
 *  User can access all posts that didn't block their company
 *    AND their blocked companies do not appear in post/comments
 */
postsLib.getAll = async userId => {
  debug('getAll');

  if (!userId) {
    throw new Error('No user id');
  }

  const user = await User.findById(userId).lean().exec();
  if (!user) {
    throw new Error('No user found');
  }

  const userCompanyId = user.linkedIn.company;
  const userBlacklistedCompanies = user.linkedIn.blacklistedCompanies;

  const posts = await Post.find({
    $or: [
      { user: ObjectId(userId) },
      {
        $and: [
          { user: { $nin: [ObjectId(userId)] } },
          { blacklistedCompanies: { $nin: [ObjectId(userCompanyId)] } },
          { participatingCompanies: { $nin: userBlacklistedCompanies } },
        ],
      },
    ],
  }).populate('user').lean().exec();

  let allPosts = {};

  posts.forEach(post => {
    // TODO hash postId?

    if (validatePermissions(user, post)) {
      const postHash = post._id;
      const simplePost = formatPost(user, post);

      allPosts[postHash] = simplePost;
    }
  });
  
  return allPosts;
};

/**
 *  Gets a detailed post, with comments, that user has access to
 */
postsLib.getOne = async (userId, postHash) => {
  debug('getOne');

  if (!userId) {
    throw new Error('No user id');
  }
  if (!postHash) {
    throw new Error('No post id');
  }

  const user = await User.findById(userId).lean().exec();
  if (!user) {
    throw new Error('No user found');
  }

  const postId = postHash; // TODO decrypt posthash
  const post = await Post
    .findById(postId)
    .populate('user')
    .populate('comments.user')
    .lean()
    .exec();
  if (!post) {
    throw new Error('No post found');
  }

  const valid = validatePermissions(user, post);
  if (!valid) {
    throw new Error('User has no permission to access post');
  }

  const fullPost = formatPost(user, post);
  fullPost.comments = [];

  post.comments.forEach(comment => {
    const fullComment = formatComment(user, comment);
    fullPost.comments.push(fullComment);
  });

  return fullPost;
};

postsLib.create = async (userId, rawPost) => {
  debug('create');

  if (!userId) {
    throw new Error('No user id');
  }
  if (!rawPost || !rawPost.text) {
    throw new Error('No post to create');
  }

  const user = await User.findById(userId).lean().exec();
  if (!user) {
    throw new Error('No user found');
  }

  const post = new Post({
    dateCreated: moment(),
    dateModified: moment(),
    user: user._id,
    title: rawPost.title,
    text: rawPost.text,
  });

  post.blacklistedCompanies = user.linkedIn.blacklistedCompanies;
  post.participatingCompanies.push(user.linkedIn.company);

  await post.save();

  // backup
  const permanentPost = new PermanentPost({
    dateCreated: moment(),
    dateModified: moment(),
    user: user._id,
    title: rawPost.title,
    text: rawPost.text,
    expiredPostId: post._id,
  });

  permanentPost.blacklistedCompanies = user.linkedIn.blacklistedCompanies;
  permanentPost.participatingCompanies.push(user.linkedIn.company);

  await permanentPost.save();

  return true;
};

postsLib.comment = async (userId, postHash, rawComment) => {
  debug('comment');

  if (!userId) {
    throw new Error('No user id');
  }
  if (!postHash) {
    throw new Error('No post id');
  }
  if (!rawComment || !rawComment.text) {
    throw new Error('No comment to create');
  }

  const user = await User.findById(userId).lean().exec();
  if (!user) {
    throw new Error('No user found');
  }

  const postId = postHash; // TODO decrypt posthash
  const post = await Post
    .findById(postId)
    .populate('user')
    .exec();
  if (!post) {
    throw new Error('No post found');
  }

  if (!validatePermissions(user, post)) {
    throw new Error('User has no permission to access post');
  }

  post.comments.push({
    dateCreated: moment(),
    dateModified: moment(),
    user: user._id,
    text: rawComment.text,
  });

  // add user's current company to post's participating companies
  const isUserInPost = post.participatingCompanies.some(c => c.equals(user.linkedIn.company));
  if (!isUserInPost) {
    post.participatingCompanies.push(user.linkedIn.company);
  }

  // add user's blacklist to post's blacklist
  const newBlacklists = _.differenceWith(
    user.linkedIn.blacklistedCompanies,
    post.blacklistedCompanies,
    (a, b) => a.equals(b) // for comparing ObjectIds
  );
  post.blacklistedCompanies = newBlacklists.concat(post.blacklistedCompanies);

  await post.save();

  // backup
  const permanentPost = await PermanentPost.findOne({ expiredPostId: postId }).exec();
  if (permanentPost) {
    permanentPost.comments = post.comments;
    permanentPost.participatingCompanies = post.participatingCompanies;
    permanentPost.blacklistedCompanies = post.blacklistedCompanies;
    await permanentPost.save();
  }

  return true;
};

postsLib.vote = async (userId, postHash, type, commentNumber) => {
  debug('vote:' + type);

  const VOTE_TYPES = ['likes', 'dislikes', 'laughs'];

  if (!userId) {
    throw new Error('No user id');
  }
  if (!postHash) {
    throw new Error('No post id');
  }
  if (!type || !VOTE_TYPES.includes(type)) {
    throw new Error('No valid type of vote to cast');
  }

  const user = await User.findById(userId).lean().exec();
  if (!user) {
    throw new Error('No user found');
  }

  const postId = postHash; // TODO decrypt posthash
  const post = await Post
    .findById(postId)
    .populate('user')
    .exec();
  if (!post) {
    throw new Error('No post found');
  }

  if (!validatePermissions(user, post)) {
    throw new Error('User has no permission to access post');
  }

  if (!commentNumber) {
    ++post.votes[type];
  } else if (commentNumber > 0) {
    ++post.comments[commentNumber].votes[type];
  }

  // add user's current company to post's participating companies
  const isUserInPost = post.participatingCompanies.some(c => c.equals(user.linkedIn.company));
  if (!isUserInPost) {
    post.participatingCompanies.push(user.linkedIn.company);
  }

  // add user's blacklist to post's blacklist
  const newBlacklists = _.differenceWith(
    user.linkedIn.blacklistedCompanies,
    post.blacklistedCompanies,
    (a, b) => a.equals(b) // for comparing ObjectIds
  );
  post.blacklistedCompanies = newBlacklists.concat(post.blacklistedCompanies);

  await post.save();

  return true;
};

/************** Helpers ******************/

/**
 * Validates whether user has access to post
 * 1. User is owner of post
 * 2. User can view AND comment on post, where
 *   * view means user's current company is not on blacklist for post
 *   * comment means no one participating in the post is on blacklist of user
 */
const validatePermissions = (user, post) => {
  if (post.user._id.equals(user._id)) {
    return true;
  }

  let canView, canEdit;

  const isUserBlacklistedByPost = post.blacklistedCompanies.some(c => c.equals(user._id));
  canView = !isUserBlacklistedByPost;

  const overlap = _.intersectionWith(
    post.participatingCompanies,
    user.linkedIn.blacklistedCompanies,
    (a, b) => a.equals(b) // for ObjectId comparison
  );
  canEdit = overlap.length === 0;

  return canView && canEdit;
};

const formatMessage = (user, message) => {  
  return {
    nickname: message.user.nickname,
    role: `${message.user.linkedIn.role} [${message.user.linkedIn.roleType}]`,
    text: message.text,
    votes: message.votes,
    commentsCount: message.comments ? message.comments.length : 0,
    isOwner: message.user._id.equals(user._id),
  };
};

const formatPost = (user, post) => {
  const message = formatMessage(user, post);
  
  const expiresIn = moment(post.dateCreated).add(12, 'hours').diff(moment(), 'seconds');
  message.expiresIn = expiresIn;
  message.title = post.title;

  return message;
};

const formatComment = (user, comment) => {
  const message = formatMessage(user, comment);
  
  const ageInSeconds = moment().diff(moment(comment.dateCreated), 'seconds');
  message.ageInSeconds = ageInSeconds;

  return message;
};

module.exports = postsLib;
