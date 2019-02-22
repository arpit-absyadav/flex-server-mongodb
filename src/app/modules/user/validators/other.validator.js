/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-20 15:35:20
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:38:08
 */
const Joi = require('joi');

// Setting up user login schema.
const userLoginSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
});
// Setting up get user data schema.
const getUserSchema = Joi.object().keys({
  _id: Joi.string()
    .invalid('undefined', 'null')
    .required()
});

module.exports = { userLoginSchema, getUserSchema };
