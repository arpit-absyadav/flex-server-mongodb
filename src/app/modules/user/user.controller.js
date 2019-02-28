/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:35
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-28 15:02:27
 */

const User = require('./user.service');
const Jwt = require('../../common/helpers/j_w_t/jwt.helper');
const errorParser = require('../../common/helpers/errorParser/error.parser');
const { sendMail, mailType } = require('../../common/mailer/mail.service');

/**
 * Create User fn: `Creating user. `
 * @description `req.body will have user data.`
 */
exports.create = async (req, res, next) => {
  try {
    let [err, user] = await User.create(req.body);
    if (!err) {
      let _user = JSON.parse(JSON.stringify(user));
      delete _user.password;
      let _token = await Jwt.create(_user);
      if (_token) {
        _user.token = _token;
      }
      // Note: Send Registration confirmation and otp
      res.success.Created('Successfully Created', _user);
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
 * User Login Fn: `User Login`
 * @description `req.body will have email and password`
 *
 */
exports.login = async (req, res, next) => {
  // console.log(req.headers);
  try {
    let [err, user] = await User.findByEmail(req.body.email);
    // console.log(err);
    // console.log(user);
    if (!err && user !== null) {
      console.log(user);
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          // console.log(isMatch);
          let _user = JSON.parse(JSON.stringify(user));
          delete _user.password;
          _user['token'] = Jwt.create(_user);
          res.success.OK('Succesfully Logged in', _user);
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
 * Get User Data Fn: ` Get User Data`
 * @description `req.body will have _id `
 * @summary this funtion will get the data having same `_id` .
 * @reference service
 */
exports.getUser = async (req, res, next) => {
  console.log(req.params);

  try {
    let [err, user] = await User.findBy_Id(req.params._id);
    console.log(user);

    if (!err) {
      res.success.OK('Successfully got User.', user);
    } else {
      res.error.NotFound('User Data not found.');
    }
  } catch (error) {
    next(error);
  }
};
