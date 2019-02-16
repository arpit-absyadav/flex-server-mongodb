/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:48:20
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-16 17:15:15
 */
// Validation Error Parser
exports.ValidationError = err => {
  // var parserdError = errorParser.parseValidationError(err);
  // reject(parserdError);
  console.error('Error: ' + err);
  let errRes = {};
  // This will set err to response erorrs field
  errRes.errors = err.details[0];
  // errRes.name = err.name;
  // deleting req.body in err response
  delete errRes.errors._object;
  return errRes;
};

// Mongoose Error Parser
exports.parseMongooseError = err => {
  // Returning first error, Mongoose error contains key as a filed name.
  // NOTE: Mongoose give multiple validation error at the same time
  let error = {
    errors: err[Object.keys(err)[0]]
  };
  return error;
};
