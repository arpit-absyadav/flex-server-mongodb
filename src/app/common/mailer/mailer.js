/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 18:00:33
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-10 12:55:01
 */

const nodemailer = require('nodemailer');
const orderTpl = require('./templates/order.tpl');
const voucherTpl = require('./templates/voucher.tpl');
const config = require('./../../../config/env/config');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailOption.account.user,
    pass: config.mailOption.account.pass
  }
});

var mailer = {};

mailer.deliverMail = function(info, content) {
  var mailOptions = {
    from: config.mailOption.account.user,
    to: info.email,
    cc: config.mailOption.cc,
    subject: info.subject,
    html: content
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to : ' + email);
      console.log('Email sent: ' + info.response);
    }
  });
};

mailer.sendVoucherMail = function(info) {
  voucherTpl.generateVoucherMail(info, content => {
    var info = {
      email: info.email,
      subject: 'Voucher'
    };
    mailer.deliverMail(info, content);
  });
};
mailer.sendOrderMail = function(info) {
  orderTpl.generateOrderMail(info, content => {
    var info = {
      email: info.email,
      subject: ' Order '
    };
    mailer.deliverMail(info, content);
  });
};
module.exports = mailer;
