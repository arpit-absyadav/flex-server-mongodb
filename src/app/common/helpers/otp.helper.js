/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 20:45:48
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:45:48
 */

var btoa = require('btoa');
var sms = require('../../../common/india_sms');
var redis = require('redis'),
  redisClient = redis.createClient();
function generateDigits() {
  return Math.floor(Math.random() * 89999 + 10000);
}

// function to generate encoded uri to identify the user otp and generate otp
exports.generateOtp = (user, callback) => {
  var encodedRedirectId = btoa(String(user.mobilenumber));
  user.otp = generateDigits();
  // this key will expire after  30 min
  redisClient.set(
    user.mobilenumber,
    JSON.stringify(user),
    'EX',
    60 * 60 * parseFloat(0.5)
  );
  var smsText = `Your OTP for  Registration is : ${
    user.otp
  } ,Expires in 30 minutes. `;
  console.log(smsText);
  console.log(encodedRedirectId);
  callback(user, encodedRedirectId);
  //  NOTE:  Uncomment for send sms on mobile.
  // sms.SMS(user.mobilenumber, smsText, response => {
  //   if (response) {
  //     console.log(response)
  //     callback(user, encodedRedirectId)
  //   } else {
  //     callback(false, false)
  //   }
  // })
};
