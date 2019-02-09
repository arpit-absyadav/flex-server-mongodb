/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:48:39
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-09 21:55:28
 */
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var config = require('./../../../../config/env/config');

exports.create = details => {
  var maxAge = config.jwt_max_age;
  if (typeof details !== 'object') {
    details = {};
  }

  if (!maxAge || typeof maxAge !== 'number') {
    maxAge = 2 * 60 * 60 * 24;
  }

  details = _.reduce(
    details || {},
    (memo, val, key) => {
      if (typeof val !== 'function' && key !== 'password') {
        memo[key] = val;
      }
      return memo;
    },
    {}
  );
  // console.table(details.sessionData)
  let token = jwt.sign(
    {
      data: details
    },
    config.jwt_secret,
    {
      expiresIn: maxAge,
      algorithm: 'HS256'
    }
  );

  return token;
};

exports.verify = function(req, res, next) {
  // console.log(jwt.decode(req.headers['authorization']))
  // req.query.token will help to activate user via link.

  if (req.headers['authorization']) {
    let token = req.headers['authorization'].split(' ');
    console.info('Token :: ' + token[1]);

    // verifies secret and checks exp
    jwt.verify(token[1], config.jwt_secret, function(err, decoded) {
      if (err) {
        // failed verification.
        return res.error.Unauthorized('Unauthorized', {
          errors: {
            message:
              'Your token has been expired or missing. Please login again..'
          }
        });
      }
      req.decoded = decoded;
      next(); // no error, proceed
    });
  } else {
    return res.error.Unauthorized('Unauthorized', {
      errors: {
        message: 'Token Missing In Request, Please login or register..',
        info: 'Token needs to autherize to access requests.'
      }
    });
  }
};
/**
 * @param  {} token [pass token this function will return the data of user]
 */
exports.decode = function(token) {
  return jwt.decode(token);
};
