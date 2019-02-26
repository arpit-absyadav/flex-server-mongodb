/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:47:54
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-26 20:11:03
 */
const mailer = require('nodemailer');
const config = require('../../config/env/config').mailConfig;
const { welcomeTpl } = require('./templates/test.tpl');
const transporter = mailer.createTransport(config.credentials);
exports.welcomeMail = async receiver => {
  console.log(config);
  let mailOptions = {
    from: config.from,
    to: receiver.to,
    cc: config.cc,
    subject: '3D Club House',
    html: await welcomeTpl(receiver)
  };
  transporter.sendMail(mailOptions, (err, resp) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + resp.response);
      console.log(resp);
    }
  });
};
