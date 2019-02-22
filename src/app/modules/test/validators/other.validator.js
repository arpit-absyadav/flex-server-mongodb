/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-20 15:35:20
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-22 14:38:08
 */
const Joi = require('joi');

// Setting up test login schema.
const testLoginSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
});
// Setting up get test data schema.
const getTestSchema = Joi.object().keys({
  _id: Joi.string()
    .invalid('undefined', 'null')
    .required()
});

module.exports = { testLoginSchema, getTestSchema };
