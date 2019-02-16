/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:47:12
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-16 16:56:08
 */
const Joi = require('joi');
const errorParser = require('../../common/helpers/errorParser/error.parser');
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
  terms: Joi.boolean()
    .required()
    .invalid(false)
});

/**
 *  this function will validate the request
 *
 * @param {req} // this parameter has the req parameters
 */
exports.validate = async (req, res, next) => {
  console.log(req.body.phone);
  Joi.validate(req.body, userSchema, err => {
    if (err === null) next();
    else res.error.BadRequest('BadReuest', errorParser.ValidationError(err));
  });
};
