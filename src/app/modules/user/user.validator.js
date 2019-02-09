/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:47:12
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:47:12
 */
const Joi = require('joi');
const errorParser = require('../../../common/helpers/errorParser/error.parser');
// Setting up user schema.
const userSchema = Joi.object().keys({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  mobile: Joi.string()
    .min(10)
    .max(10)
    .required(),
  pincode: Joi.string()
    .min(6)
    .max(6)
    .required(),
  terms: Joi.boolean()
    .required()
    .invalid(false)
});

/**
 *  this function will validate the request
 *
 * @param {req} // this parameter has the req parameters
 */
exports.validate = async requestedData => {
  console.log(requestedData.phone);
  return new Promise((resolve, reject) => {
    Joi.validate(requestedData, userSchema, err => {
      if (err === null) resolve(true);
      else {
        // var parserdError = errorParser.parseValidationError(err);
        // reject(parserdError);
        console.error('Error: ' + err);
        let errRes = {};
        // This will set err to response erorrs field
        errRes.errors = err.details[0];
        errRes.name = err.name;
        // deleting req.body in err response
        delete errRes.errors._object;
        // passing name as validationError
        reject(errRes);
      }
    });
  });
};
