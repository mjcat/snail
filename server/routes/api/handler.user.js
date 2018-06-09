'use strict';

const _ = require('lodash');
const Boom = require('boom');
const debug = require('debug')('snailed:user');

const user = require('../../lib/user');

const handler = {};

handler.getData = async (req, res) => {
  debug('getData');

  const userId = req.user.id;

  if (!userId) {
    throw Boom.badRequest('No user id');
  }

  try {
    const userData = await user.getData(userId);
    
    res.json({ status: 200, userData });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('User get error');
  }
};

handler.update = async (req, res) => {
  debug('update');

  const userId = req.user.id;
  const userData = req.body.userData;

  if (!userId) {
    throw Boom.badRequest('No user id');
  } else if (!userData) {
    throw Boom.badRequest('No user data to update');
  }

  try {
    const success = await user.update(userId, userData);
    if (!success) {
      throw new Error('User update failed');
    }
    
    res.json({ status: 200 });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('User update error');
  }
};

handler.getCompanySuggestions = async (req, res) => {
  debug('getCompanySuggestions');

  const input = _.get(req, 'query.input');

  try {
    const suggestions = await user.getCompanySuggestions(input);

    res.json({ status: 200, suggestions });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('Suggestions fetch error');
  }
};

module.exports = handler;
