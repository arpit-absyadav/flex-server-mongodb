/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:46:13
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-16 16:58:19
 */

const User = require('mongoose').model('User');

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
