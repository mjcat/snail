const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const debug = require('debug')('snailed:server');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const routes = require('./routes');
const app = express();

mongoose.Promise = bluebird;
mongoose.connect(
  process.env.DB_URL,
  { promiseLibrary: bluebird }
)
  .then(() =>  debug('connection succesful'))
  .catch(err => debug(err))
;

app.use(cors(
  { origin: 'http://localhost:8080' }
));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// client
app.use(history()); // use HTML5 history API to get rid of # in SPA
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../dist')));

// api routes
app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;