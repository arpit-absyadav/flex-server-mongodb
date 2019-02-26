/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:48
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-23 00:34:29
 */

var sms = require('../sms/message');
var redis = require('redis'),
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1'
  });
exports.otpDigits = () => {
  return Math.floor(Math.random() * 89999 + 10000);
};

exports.convertMobile = mobile => {
  let converted = String(mobile).replace(/.(?=.{4})/g, '*');
  return converted;
};

// function to generate encoded uri to identify the user otp and generate otp
exports.sendOTP = data => {
  // this key will expire after  30 min
  redisClient.set(
    String(data.user._id),
    data.otp,
    'EX',
    60 * 60 * parseFloat(0.5)
  );
  var smsText = `${data.text} ${data.otp} ,Expires in 30 minutes. `;
  console.log(smsText);
  //  NOTE:  Uncomment for send sms on mobile.
  // sms.SMS(data.user.mobile, smsText, response => {
  //   if (response) {
  //     console.log(response);
  //     // callback(user, encodedRedirectId);
  //   } else {
  //     // callback(false, false);
  //   }
  // });
};

exports.verifyOtp = (_id, otp) => {
  return new Promise((resolve, reject) => {
    redisClient.get(String(_id), function(err, reply) {
      if (err) return err;

      console.log('reply');
      console.log(reply);

      // reply is null when the key is missing
      if (Number(reply) === Number(otp)) {
        resolve(true);
      } else resolve(false);
    });
  });
};
