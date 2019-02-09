/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:47:06
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:47:06
 */
const user = require('./schemas/user.validator');
let errDetails = {};

// Validating user at the time of registration..
exports.validateUser = async (req, res, next) => {
  try {
    let validateUser = await user.validate(req.body);
    if (validateUser == true) {
      next();
    }
  } catch (error) {
    // Creating 1 depth of object.
    // console.error(error);
    // let errDepth = { errors: error };
    let msgObject = {};
    var parsedError = {
      message: error.errors.message,
      path: error.errors.path[0],
      value: error.errors.context.value,
      invalids: error.errors.context.invalids
    };
    // So, the validation error will be append in errors field
    errDetails.errors = parsedError;
    res.error.BadRequest(error.name, errDetails);
  }
};
