/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:31
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-16 16:41:46
 */
var multer = require('multer');
var user = require('./user.controller');
var _jwtToken = require('./../../common/helpers/j_w_t/jwt.helper');
var _validateuser = require('./user.validator');
const uploads = multer({ limits: { fileSize: 10 * 1024 * 1024 } });
var prefix = '/user';
module.exports = function(app) {
  app
    .route(prefix + '/registration')
    .all(_validateuser.validate)
    .post(user.createUser);
  app.route('/upload').post(uploads.any(), user.upload);
};
