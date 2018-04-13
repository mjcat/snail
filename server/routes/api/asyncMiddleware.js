const Boom = require('boom');

const asyncMiddleware = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(err => {
		if (process.env.DEBUG) {
			console.error(err);
		}
		if (!err.isBoom) {
			return next(Boom.badImplementation(err));
		}
		return next(err);
	});
};

module.exports = asyncMiddleware;
