/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:46:13
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-21 18:02:33
 */

const Test = require('mongoose').model('Test');
const handleMongooseError = require('../../common/handlers/mongoose.error.handler');

/**
 * @function : `Create  Test Fn`
 * @description : `Will return result as array`
 */
exports.create = test => {
  try {
    const _test = new Test(test);
    return new Promise((resolve, reject) => {
      _test
        .save()
        .then(result => {
          resolve([false, result]);
        })
        .catch(err => {
          console.error(err);
          resolve([err, false]);
        });
    });
  } catch (error) {
    return error;
  }
};

/**
 * @function : `Get Test Fn`
 * @description : `Will return result as array`
 *
 * @param { string } email : `will have email `
 */
exports.findByEmail = email => {
  try {
    return new Promise((resolve, reject) => {
      Test.findOne({ email: email, isActivated: true })
        .then(_test => resolve([false, _test]))
        .catch(err => resolve([err, false]));
    });
  } catch (error) {
    return error;
  }
};

/**
 * @function : `Find by id Test Fn`
 * @description : `This will get the result matching with id.`
 *
 * @param { string } _id : _id is the unique id created by mongodb itself. Using this the data can be identfied.
 *
 */
exports.findBy_Id = _id => {
  try {
    return new Promise((resolve, reject) => {
      Test.findOne({ _id: _id, isActivated: true })
        .then(_test => resolve([false, _test]))
        .catch(err => resolve([err, false]));
    });
  } catch (error) {
    return error;
  }
};

/**
 * @function : `Update Test Fn`
 * @description : `This will update the document.`
 *
 * @param { string } _id : _id is the unique id created by mongodb itself. Using this the data can be identfied.
 * @param { object } data : data is a object with existing collection keys and values eg:`{ isActivated: true } `
 */
exports.update = (_id, data) => {
  try {
    return new Promise((resolve, reject) => {
      Test.where({ _id: _id })
        .update({ $set: data })
        .then(_test => resolve([false, _test]))
        .catch(err => resolve([err, false]));
    });
  } catch (error) {
    return error;
  }
};
