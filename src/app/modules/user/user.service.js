/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:46:13
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-09 21:54:35
 */

const User = require('mongoose').model('User');
const handleMongooseError = require('../../common/handlers/mongoose.error.handler');

exports.createUser = _user => {
  const user = new User(_user);
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
