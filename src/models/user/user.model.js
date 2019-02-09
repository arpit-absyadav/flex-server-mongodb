/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-09 17:51:48
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-09 17:59:13
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../../config/env/config');
const handleMongooseError = require('./../../common/handlers/mongoose.error.handler');
Schema = mongoose.Schema;
const id = mongoose.Types.ObjectId();
const user_schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    unique: true,
    default: Math.floor(100000 + Math.random() * 900000)
  },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: null },
  credits: {
    balance: { type: Schema.Types.Decimal128, default: '0.0', require: true },
    lastUpdated: { type: Date, default: Date.now }
  },
  isOtpVerified: { type: Boolean, required: true, default: false },
  isActivated: { type: Boolean, required: true, default: false },
  terms: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now, required: true }
});

// Generate hash of password before saving
user_schema.pre('save', function(next) {
  bcrypt.genSalt(config.saltRounds, (err, salt) => {
    // this.userId = Math.floor(100000 + Math.random() * 900000);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (!err) {
        this.password = hash;
        next();
      } else new Error('Cant Hash the password');
    });
  });
});
user_schema.plugin(handleMongooseError);
mongoose.model('User', user_schema);
