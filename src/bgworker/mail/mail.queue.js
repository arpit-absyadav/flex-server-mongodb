/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-25 16:49:08
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-28 15:09:23
 */
const Q = require('bull');
const { welcomeMail } = require('./../../app/common/mailer/mailer');
const mailQ = new Q('mailQ', 'redis://127.0.0.1:6379');
/**
 *
 */
mailQ.process((job, done) => {
  console.log('Mail Q initiated');
  const mailStat = new Promise((resolve, reject) => {
    switch (job.data.type) {
      case 'welcomeMail':
        welcomeMail(job.data);
      default:
        break;
    }
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  mailStat
    .then(result => {
      console.log(result);
      done();
    })
    .catch(err => {
      console.error(err);
      done();
    });
});

module.exports = { mailQ };
