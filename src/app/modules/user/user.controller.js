/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:35
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-16 17:14:30
 */
var atob = require('atob');
var redis = require('redis');
var redisClient = redis.createClient();

var User = require('./user.service');
var Jwt = require('../../common/helpers/j_w_t/jwt.helper');
var errorParser = require('../../common/helpers/errorParser/error.parser');
/**
 * Controller function
 *
 */
exports.createUser = async (req, res, next) => {
  console.log('reached to user');

  try {
    let [err, user] = await User.createUser(req.body);

    if (!err) {
      let _user = JSON.parse(JSON.stringify(user));
      delete _user.password;
      // create token passing _user as payload
      let _token = await Jwt.create(_user);
      if (_token) {
        _user.token = _token;
      }
      res.success.Created('Successfully Created', _user);
    } else if (err.name === 'ValidationError') {
      // removing data of first depth
      // this will prevent to show some properties in response data property

      res.error.UnprocessableEntity(
        'validation Failed',
        errorParser.parseMongooseError(err.errors)
      );
    }
  } catch (error) {
    console.error('ERROR : ' + error);
    res.error.ServerError('Something went wrong. Please try again !!', error);
  }
};
exports.upload = function(req, res, next) {
  console.log(req.files);
};
