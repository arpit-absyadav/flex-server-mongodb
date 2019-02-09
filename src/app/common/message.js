/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 18:00:42
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-09 20:39:50
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

// Twilio
var accountSid = 'AC85b25c77708580b6b177486bac08d1e'; // Your Account SID1 from www.twilio.com/console
var authToken = 'db3dc3d6bed5db6a44898039063ebd7'; // Your Auth2 Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);
exports.sendMsg = () => {
  client.messages
    .create({
      body: 'Hello from Node',
      to: '+919999999999', // Text this number
      from: '+12552911823' // From a valid Twilio number
    })
    .then(message => console.log(message));
};

// testing  twilio
// const msg = require('./src/common/message');
// msg.sendMsg();
