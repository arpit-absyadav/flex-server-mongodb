/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-27 13:14:31
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-28 15:07:56
 */
exports.mailType = {
  welcome: 'welcomeMail',
  order: 'orderMail'
};
exports.smsType = {
  welcome: 'welcomeSMS',
  order: 'orderSMS'
};
const { mailQ } = require('../../../bgworker/mail/mail.queue');
exports.sendMail = (type, data) => {
  data['type'] = type;
  mailQ.add(data);
};

exports.sendSMS = (type, data) => {
  mailQ.add(type, data);
};
