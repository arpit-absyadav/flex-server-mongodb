/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:35
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:39:58
 */
var atob = require('atob');
var redis = require('redis');
var redisClient = redis.createClient();

var Test = require('./test.service');
var Jwt = require('../../common/helpers/j_w_t/jwt.helper');
var errorParser = require('../../common/helpers/errorParser/error.parser');

/**
 * Create Test fn: `Creating test. `
 * @description `req.body will have test data.`
 */
exports.create = async (req, res, next) => {
  try {
    let [err, test] = await Test.create(req.body);
    if (!err) {
      let _test = JSON.parse(JSON.stringify(test));
      delete _test.password;
      let _token = await Jwt.create(_test);
      if (_token) {
        _test.token = _token;
      }
      // Note: Send Registration confirmation and otp
      res.success.Created('Successfully Created', _test);
    } else if (err.name === 'ValidationError') {
      res.error.UnprocessableEntity(
        err._message,
        errorParser.parseMongooseError(err.errors)
      );
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Test Login Fn: `Test Login`
 * @description `req.body will have email and password`
 *
 */
exports.login = async (req, res, next) => {
  // console.log(req.headers);
  try {
    let [err, test] = await Test.findByEmail(req.body.email);
    // console.log(err);
    // console.log(test);
    if (!err && test !== null) {
      console.log(test);
      test.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          // console.log(isMatch);
          let _test = JSON.parse(JSON.stringify(test));
          delete _test.password;
          _test['token'] = Jwt.create(_test);
          res.success.OK('Succesfully Logged in', _test);
        }
        res.error.NotFound('Credentials does not match !!');
      });
    } else {
      res.error.NotFound('Credentials does not match !!');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get Test Data Fn: ` Get Test Data`
 * @description `req.body will have _id `
 * @summary this funtion will get the data having same `_id` .
 * @reference service
 */
exports.getTest = async (req, res, next) => {
  console.log(req.params);

  try {
    let [err, test] = await Test.findBy_Id(req.params._id);
    console.log(test);

    if (!err) {
      res.success.OK('Successfully got Test.', test);
    } else {
      res.error.NotFound('Test Data not found.');
    }
  } catch (error) {
    next(error);
  }
};
