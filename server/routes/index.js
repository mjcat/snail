'use strict';

const express = require('express');
const router = express.Router();
const asyncMiddleware = require('./asyncMiddleware');

const handlers = {};
handlers.auth = require('./api/handler.auth');
handlers.user = require('./api/handler.user');

// public routes
router.get('/auth/preflight', handlers.auth.getPreflightData);
router.post('/auth/login', asyncMiddleware(handlers.auth.login));

// check credentials for all routes below
router.all('/*', asyncMiddleware(handlers.auth.checkLogin));

// protected routes
router.get('/user', asyncMiddleware(handlers.user.getData));
router.get('/user/getCompanySuggestions', asyncMiddleware(handlers.user.getCompanySuggestions));
router.post('/user', asyncMiddleware(handlers.user.update));

module.exports = router;
