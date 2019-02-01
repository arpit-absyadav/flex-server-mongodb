/*
 * @Author: Arpit.Yadav
 * @Date: 2018-09-05 14:58:25
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2018-10-02 12:01:58
 */
const https = require('https');
const fs = require('fs');
const config = require('./src/config/env/config');
const express = require('./src/config/express');
const mongoose = require('./src/config/database/mongoose');

const database = mongoose();
var app = express();

const isProductionEnv =
  typeof process.env.NODE_ENV == 'production' ? true : false;
if (isProductionEnv) {
  /**
   * @NOTE If Environment is `production`,
   * server will run on http with `443` default port.
   *
   * ssl files path is only avaialble in prodution.json file
   * @NOTE Remove fake  from `config.ssl.fake.privatekey` to use real ssl
   */

  https
    .createServer(
      {
        key: fs.readFileSync(config.ssl.fake.privatekey),
        cert: fs.readFileSync(config.ssl.fake.certificate)
      },
      app
    )
    .listen(config.port, function() {
      console.log('----------------------------------------------------------');
      console.log('Server listening at port : ' + config.port);
      console.log('Time : ' + new Date());
      console.log('----------------------------------------------------------');
    });
} else {
  /**
   * @NOTE If Environment is not `production`,
   * server will run on http with `3000` port.
   */
  app.listen(process.env.PORT || config.port, function() {
    console.log('----------------------------------------------------------');
    console.log('Server listening at port : ' + config.port);
    console.log('Time : ' + new Date());
    console.log('----------------------------------------------------------');
  });
}

module.exports = app;
