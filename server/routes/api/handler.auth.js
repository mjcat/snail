const Boom = require('boom');
const crypto = require('crypto');
const debug = require('debug')('snailed:auth');

const asyncMiddleware = require('./asyncMiddleware');
const auth = require('../../lib/auth');

const handler = {};
const baseRedirectUrl = process.env.CLIENT_URL || process.env.SERVER_URL;

handler.getPreflightData = (req, res) => {
  debug('getPreflightData');

  res.json({
    status: 200,
    linkedInClientId: process.env.LINKEDIN_CLIENT_ID,
    csrfToken: crypto.randomBytes(10).toString('hex'),
    linkedInRedirectUrl: baseRedirectUrl + '/auth/linkedin',
    serverBaseUrl: process.env.SERVER_URL,
  });
};

handler.login = asyncMiddleware(async (req, res) => {
  debug('login');

  const accessCode = req.body.accessCode;
  if (!accessCode) {
    throw Boom.badRequest('No access code');
  }

  try {
    const user = await auth.login({
      accessCode,
      linkedInRedirectUrl: baseRedirectUrl + '/auth/linkedin',
    });

    res.json({ status: 200, user });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('User login error');
  }
});

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
