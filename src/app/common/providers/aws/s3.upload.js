/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-16 11:41:05
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-16 12:59:35
 */

const AWS = require('aws-sdk');
var config = require('./../../../../config/env/config');
var AWS_S3_BUCKET_NAME = config.aws.bucketName;
var folderStructure = '';
AWS.config.update(config.aws.awsConfig);
var s3 = new AWS.S3();
function FileUploadService() {}
/**
 * Returns a promise with the URL string.
 *
 * @param file file data `** Buffer **`
 * @param urlKey name of the file
 * @param folder folder where the file will bw structured.
 */
FileUploadService.prototype.uploadImage = function(file, urlKey, folder) {
  console.log(file);
  folderStructure = AWS_S3_BUCKET_NAME + folder;
  var params = {
    Body: file.buffer,
    Bucket: folderStructure,
    ACL: 'public-read',
    Key: urlKey
  };
  console.log(params);
  return new Promise((resolve, reject) => {
    s3.putObject(params)
      .promise()
      .then(
        function(data) {
          // returnig full path of file
          resolve(config.aws.bucketPath + folderStructure + '/' + urlKey);
        },
        function(err) {
          console.error(err);
          reject(err);
        }
      );
  });
};

exports.FileUploadService = FileUploadService;
