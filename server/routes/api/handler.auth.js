'use strict';

const Boom = require('boom');
const crypto = require('crypto');
const debug = require('debug')('snailed:auth');
const jwt = require('jsonwebtoken');

const auth = require('../../lib/auth');

const handler = {};
const baseRedirectUrl = process.env.CLIENT_URL || process.env.SERVER_URL;
const JWT_SECRET = process.env.JWT_SECRET;

/**
 *  @param   user       object
 *  @param   expiresIn  number of seconds
 */
const generateToken = (user, expiresIn) => {
  const payload = {
    user,
    iss: 'snailed',
    sub: 'general',
    version: 'v1',
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 *  Send down oauth and public server data to client upon init
 */
handler.getPreflightData = (req, res) => {
  res.json({
    status: 200,
    linkedInClientId: process.env.LINKEDIN_CLIENT_ID,
    csrfToken: crypto.randomBytes(10).toString('hex'),
    linkedInRedirectUrl: baseRedirectUrl + '/auth/linkedin',
    serverBaseUrl: process.env.SERVER_URL,
  });
};

/**
 *  Check the Auth header in request for all protected routes
 *  Attaches user { userId } to request for all protected routes
 */
handler.checkLogin = async (req, res, next) => {
  const token = (req.get('Authorization') || '').split(/\s+/)[1] || '';
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload.user;
    next();
  } catch (error) {
    throw Boom.forbidden(error.message);
  }
};

/**
 *  Login using oauth and generate 3 month JWT
 *  Creates or updates the user data from oath
 */
handler.login = async (req, res) => {
  const accessCode = req.body.accessCode;
  if (!accessCode) {
    throw Boom.badRequest('No access code');
  }

  try {
    const user = await auth.login({
      accessCode,
      linkedInRedirectUrl: baseRedirectUrl + '/auth/linkedin',
    });

    if (!user) {
      throw new Error('User create or update failed');
    }

    const THREE_MONTHS = (60 * 60 * 24) * 30 * 3;
    const token = generateToken(user, THREE_MONTHS);
    const expiresIn = THREE_MONTHS;

    res.json({ status: 200, user: { token, expiresIn } });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('User login error');
  }
};

module.exports = handler;
