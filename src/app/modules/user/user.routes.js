/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:31
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:38:56
 */
var user = require('./user.controller');
var _jwtToken = require('../../common/helpers/j_w_t/jwt.helper');
var _userValidator = require('./user.validator');
var prefix = '/user';
module.exports = function(app) {
  // Registration route
  app
    .route(prefix + '/registration')
    .all(_userValidator.validate)
    .post(user.create);

  // Login route
  app
    .route(prefix + '/login')
    .all(_userValidator.validateLogin)
    .post(user.login);
  // Get User
  app
    .route(prefix + '/getUser/:_id')
    .all(_userValidator.validateUserId, _jwtToken.verify)
    .get(user.getUser);
};
