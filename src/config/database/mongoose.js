/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 17:55:16
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-21 00:40:19
 */

var mongoose = require('mongoose');
var config = require('./../env/config');

module.exports = function() {
  var databaseConnection = mongoose.connect(
    config.db_connectionString.flex,
    { useNewUrlParser: true, useCreateIndex: true },
    function(err) {
      if (!err) {
        console.log(
          'Mongoose default connection open to ' +
            config.db_connectionString.flex
        );
      } else {
        console.log('Mongoose default connection error: ' + err);
      }
    }
  );

  // CONNECTION EVENTS
  // When successfully connected

  // mongoose.connection.on("connected", function() {
  //   console.log(
  //     "Mongoose default connection open to " +
  //       config.envConfig.db_connectionString
  //   );
  // });

  // // If the connection throws an error
  // mongoose.connection.on("error", function(err) {
  //   console.log("Mongoose default connection error: " + err);
  // });

  // // When the connection is disconnected
  // mongoose.connection.on("disconnected", function() {
  //   console.log("Mongoose default connection disconnected");
  // });

  // // If the Node process ends, close the Mongoose connection
  // process.on("SIGINT", function() {
  //   mongoose.connection.close(function() {
  //     console.log(
  //       "Mongoose default connection disconnected through app termination"
  //     );
  //     process.exit(0);
  //   });
  // });

  // Require database models here
  require('./../../app/modules/school/school.model');

  // schemas
  // Note: Do not remove above line for cli purpose
  return databaseConnection;
};
