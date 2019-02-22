/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:51:15
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-23 01:52:06
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var responseHandler = require('./../app/common/handlers/response.handler');
module.exports = function() {
  const app = express();
  app.use(morgan('dev'));
  app.use(morgan(':req[content-type] -> :res[content-type]'));

  // this will set content-type to text/plain
  // comment to set contenct-type to application/json
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // ## CORS middleware
  //
  // see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
  var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Credentials', false);
    res.setHeader('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(204);
    } else {
      next();
    }
  };
  app.use(allowCrossDomain);
  app.use(bodyParser.json());
  app.use(responseHandler());

  app.use(express.static('./app'));
  app.use(express.static('./config'));

  // ////////////////////////////////////////////////
  // ////////////////// App Routes///////////////////
  // ////////////////////////////////////////////////

  require('./../app/modules/user/user.routes')(app);
  // aboveroutes
  // Note: Do not remove above line for cli purpose

  // ////////////////////////////////////////////////
  // ///////////App default error handler////////////
  // ////////////////////////////////////////////////

  // 404
  app.use(function(req, res, next) {
    return res.error.NotFound('Requested Route [ ' + req.url + ' ] Not found.');
  });

  // 500 - Any server error
  app.use(function(err, req, res, next) {
    console.error(err);
    return res.error.ServerError('Internal Server Error', err);
  });
  return app;
};
