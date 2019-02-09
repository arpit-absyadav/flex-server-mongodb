var config = require('../../config/env/config');
var redis = require('redis'),
  redisClient = redis.createClient();
var Client = require('node-rest-client').Client;
var client = new Client();

var args = {
  headers: { 'Content-Type': 'application/json' }
};
var SHIPROCKET_TOKEN_KEY = 'shiprocket_token';

var base = 'https://apiv2.shiprocket.in';
// var base = 'http://krmct000.kartrocket.com';
var endPoint = {
  login: base + '/v1/external/auth/login',
  getAllOrders: base + '/v1/external/orders/',
  placeOrder: base + '/v1/external/orders/create/adhoc',
  serviceAvailability: base + '/v1/external/courier/serviceability/',
  getOrderById: base + '/v1/external/orders/show/'
};
// Activating session with shiprocket
function login(callback) {
  args.data = {
    email: config.shiprocket.email,
    password: config.shiprocket.password
  };
  client.post(endPoint.login, args, function(data, response) {
    console.log(data);
    if (data.id != undefined && data.token != undefined) {
      redisClient.set(SHIPROCKET_TOKEN_KEY, data.token);
      if (callback != undefined) {
        callback(data.token);
      }
    } else {
      if (callback != undefined) {
        callback(null);
      }
    }
  });
}

// Getting shiprocket token from redis
function getShipRocketAccessToken(callback) {
  redisClient.get(SHIPROCKET_TOKEN_KEY, function(err, token) {
    if (token != null) {
      callback('Bearer ' + token);
    } else {
      login(function(token) {
        callback('Bearer ' + token);
      });
    }
  });
}

// check if service is available

function serviceAvailability(pincode, callback) {
  console.log('Ship reoket service availability');
  var args = {};
  args.parameters = {
    pickup_postcode: config.currentPincode,
    delivery_postcode: pincode,
    weight: 2,
    cod: 0
  };

  getShipRocketAccessToken(function(token) {
    // console.log('token', token)

    args.headers = { Authorization: token };
    console.log(args);
    client.get(endPoint.serviceAvailability, args, function(
      pincodeData,
      response
    ) {
      // console.log('pincodeData', pincodeData.data.available_courier_companies)
      console.log('SHIPROCKET RESPONSE:', response.Status);
      console.log('SHIPROCKET PINCODEDATA:', pincodeData);

      if (pincodeData.status_code == 404) {
        console.log('Inside If pincode avail');
        pincodeData.data = {};
        pincodeData.data.available_courier_companies = '';
        callback(response, pincodeData);
      } else if (pincodeData.status_code == 422) {
        console.log('Inside If pincode avail');
        pincodeData.data = {};
        pincodeData.data.available_courier_comp;
        callback(response, pincodeData);
      } else {
        callback(response, pincodeData);
      }
    });
  });
}

// Exporting Functions
exports.login = login;
exports.checkServiceAvailability = serviceAvailability;
