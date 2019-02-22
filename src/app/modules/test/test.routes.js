/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:31
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:38:56
 */
var test = require('./test.controller');
var _jwtToken = require('../../common/helpers/j_w_t/jwt.helper');
var _testValidator = require('./test.validator');
var prefix = '/test';
module.exports = function(app) {
  // Registration route
  app
    .route(prefix + '/registration')
    .all(_testValidator.validate)
    .post(test.create);

  // Login route
  app
    .route(prefix + '/login')
    .all(_testValidator.validateLogin)
    .post(test.login);
  // Get Test
  app
    .route(prefix + '/getTest/:_id')
    .all(_testValidator.validateTestId, _jwtToken.verify)
    .get(test.getTest);
};
