const Boom = require('boom');
const debug = require('debug')('snailed:user');

const user = require('../../lib/user');

const handler = {};

handler.getData = async (req, res) => {
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

module.exports = handler;
