// Validation Error Parser
exports.parseValidationError = error => {
  console.error('Error: ' + error);

  let innerErrObj = error.details[0];
  delete innerErrObj._object;

  let parsedError = {};
  let childError = {};

  childError.message = innerErrObj.message;
  childError.path = innerErrObj.path[0];
  childError.value = innerErrObj.context.value;

  parsedError.message = innerErrObj.message;
  parsedError.errors = childError;

  return parsedError;
};

// Mongoose Error Parser
exports.parseMongooseError = error => {
  // Returning first error, Mongoose error contains key as a filed name.
  // NOTE: Mongoose give multiple validation error at the same time

  return error[Object.keys(error)[0]];
};
