const express = require('express');
const router = express.Router();

const handlers = {};
handlers.auth = require('./api/handler.auth');

router.get('/', handlers.auth.getUser);

router.post('/', (req, res, next) => {
	res.json(req.body);
});

module.exports = router;
