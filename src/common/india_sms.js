/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 18:00:42
 * @Last Modified by:   Arpit.Yadav
 * @Last Modified time: 2019-02-09 18:00:42
 */

var express = require('express');
var axios = require('axios');

/**
 * this function will send all sms..
 * @param  {} mobile
 * @param  {} text text will have all the content, which has to send.
 * @param  {} callback
 */
exports.SMS = function(mobile, text, callback) {
  console.log('SMS :: India sms initialized.');

  axios
    .get('https://app.indiasms.com/sendsms/sendsms.php', {
      params: {
        username: '',
        password: '',
        type: 'TEXT',
        sender: 'ABC',
        mobile: mobile,
        message: text
      }
    })
    .then(function(response) {
      console.log('Getting resp from india SMS');

      console.log(response.statusText);
      callback(true);
      // console.log('Getting resp from india SMS')
    })
    .catch(function(error) {
      console.log('Getting resp from india SMS err');

      console.log(error);
      callback(false);
    });

  // callback('Did not send any request to indaiSMS')
};
