/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:51:15
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:51:15
 */
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function() {
  var app = express();
  app.use(morgan('dev'));

  // this will set content-type to text/plain
  // comment to set contenct-type to application/json
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  // using error middleware
  // app.use(errorMiddleware)

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

  app.use(express.static('./app'));
  app.use(express.static('./config'));

  // ////////////////////////////////////////////////
  // ////////////////// App Routes///////////////////
  // ////////////////////////////////////////////////

  return app;
};
