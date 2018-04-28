const Boom = require('boom');
const crypto = require('crypto');
const debug = require('debug')('snailed:auth');

const auth = require('../../lib/auth');

const handler = {};
const baseRedirectUrl = process.env.CLIENT_URL || process.env.SERVER_URL;

handler.getPreflightData = (req, res) => {
  res.json({
    status: 200,
    linkedInClientId: process.env.LINKEDIN_CLIENT_ID,
    csrfToken: crypto.randomBytes(10).toString('hex'),
    linkedInRedirectUrl: baseRedirectUrl + '/auth/linkedin',
    serverBaseUrl: process.env.SERVER_URL,
  });
};

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

    res.json({ status: 200, user });
  } catch (e) {
    debug('error: ' + e);
    throw Boom.badImplementation('User login error');
  }
};

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

module.exports = handler;
