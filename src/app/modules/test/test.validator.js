/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:47:12
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:38:29
 */
const Joi = require('joi');
const errorParser = require('../../common/helpers/errorParser/error.parser');
const testSchema = require('./validators/registration.validator');
const {
  testLoginSchema,
  getTestSchema
} = require('./validators/other.validator');
/**
 * @function : `this function will validate the registration request`
 * @param {req} // this parameter has the req parameters
 */
exports.validate = async (req, res, next) => {
  console.log(req.body.phone);
  Joi.validate(req.body, testSchema, err => {
    if (err === null) next();
    else res.error.BadRequest('BadRequest', errorParser.ValidationError(err));
  });
};
/**
 * @function : `this function will validate the login request` *
 * @param {req} // this parameter has the req parameters
 */
exports.validateLogin = async (req, res, next) => {
  // console.log(req.body);
  Joi.validate(req.body, testLoginSchema, err => {
    if (err === null) next();
    else res.error.BadRequest('BadRequest', errorParser.ValidationError(err));
  });
};

/**
 * @function : `this function will validate the login request` *
 * @param {req} // this parameter has the req parameters
 */
exports.validateTestId = async (req, res, next) => {
  console.log(req.params);
  Joi.validate(req.params, getTestSchema, err => {
    if (err === null) next();
    else res.error.BadRequest('BadRequest', errorParser.ValidationError(err));
  });
};
