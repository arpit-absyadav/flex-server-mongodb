const bcrypt = require('bcrypt');
var config = require('../config/env/config');

// Create a SHA256 hash
exports.hash = function(str) {
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(str, salt, function(err, hash) {
        if (!err) {
          resolve(hash);
        } else {
          reject(false);
        }
      });
    });
  });
};
// Compare password
exports.compareHash = function(pass, hash, callback) {
  console.log('Comparing hash');
  console.log(pass, '-----', hash);

  bcrypt.compare(pass, hash, function(err, res) {
    // res == true
    if (err) {
      console.error('Error while comparing user password... ');
    }
    callback(res);
  });
};
