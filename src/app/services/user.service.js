/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:46:13
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:46:13
 */
var models = require('./models.list');
var User = models.User;
var handleMongooseError = require('../../common/handlers/mongoose.error.handler');

exports.createUser = _user => {
  var user = new User(_user);
  return new Promise((resolve, reject) => {
    user
      .save()
      .then(result => {
        resolve([false, result]);
      })
      .catch(err => {
        console.error(err);
        resolve([err, false]);
      });
  });
};
