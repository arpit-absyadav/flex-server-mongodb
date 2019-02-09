/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:46:03
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:46:03
 */
let _lisOfModels = {};
_lisOfModels.User = require('mongoose').model('User');

// export the list
module.exports = _lisOfModels;
