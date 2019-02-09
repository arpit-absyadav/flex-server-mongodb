/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:31
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:45:31
 */
var user = require('../controllers/user/user.controller.js');
var _verifyToken = require('../../common/helpers/j_w_t/jwt.helper');
var _validateuser = require('./../validators/validator');
var prefix = '/user';
module.exports = function(app) {
  app
    .route(prefix + '/registration')
    .all(_validateuser.validateUser, _verifyToken.verify)
    .post(user.createUser);
};
