const crypto = require('crypto');
const debug = require('debug')('snailed:auth');
const mongoose = require('mongoose');

const asyncMiddleware = require('./asyncMiddleware');
const User = require('../../../models/User');

const handler = {};

handler.getPreflightData = (req, res) => {
  debug('getPreflightData');

  res.json({
    linkedInClientId: process.env.LINKEDIN_CLIENT_ID,
    authCsrfToken: crypto.randomBytes(10).toString('hex'),
  });
};

handler.getUser = asyncMiddleware(async (req, res) => {
  debug('getUser');
  try {
    const user = await User.findOne({ linkedInId: 'test'});
    if (user) {
    	res.json({
    		name: user.name,
    		nickname: user.nickname,
    		roleType: user.roleType,
    	});
    } else {
    	res.json({});
    }
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('User lookup error');
  }
});

handler.updateUser = asyncMiddleware(async (req, res) => {
  debug('updateUser');
  try {
    const linkedInId = req.body.linkedInId;
    if (!linkedInId) {
      throw Boom.badRequest('No id passed');
    }

    const user = await User.findOne({ linkedInId });
    if (user) {
      user.nickname = req.body.nickname;
      user.roleType = req.body.roleType;
      
      await user.save();
      res.json({
        nickname: user.nickname,
        roleType: user.roleType,
      });
    } else {
      throw Boom.badRequest('No user found');
    }
  } catch (e) {
    debug('error: ' + e)
    throw Boom.badImplementation('Payment request error');
  }
});

module.exports = handler;
