/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-16 11:41:05
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-26 22:09:46
 */

const AWS = require('aws-sdk');
var config = require('./../../../../config/env/config');
var AWS_S3_BUCKET_NAME = config.aws.bucketName;
var folderStructure = '';
AWS.config.update(config.aws.awsConfig);
var s3 = new AWS.S3();
function FileStreamService() {}
/**
 * Returns a promise with the URL string.
 *
 * @param file file data `** Buffer **`
 * @param urlKey name of the file
 * @param folder folder where the file will bw structured.
 */
FileStreamService.prototype.stream = function(req, res, next) {
  console.log(file);
  folderStructure = AWS_S3_BUCKET_NAME + folder;
  var params = {
    Bucket: folderStructure,
    Key: req.key
  };
  console.log(params);
  s3.headObject(params, function(err, data) {
    if (err) {
      // an error occurred
      console.error(err);
      return next();
    }
    var stream = s3.getObject(params).createReadStream();

    // forward errors
    stream.on('error', function error(err) {
      //continue to the next middlewares
      return next();
    });

    //Add the content type to the response (it's not propagated from the S3 SDK)
    res.set('Content-Type', mime.lookup(key));
    res.set('Content-Length', data.ContentLength);
    res.set('Last-Modified', data.LastModified);
    res.set('ETag', data.ETag);

    stream.on('end', () => {
      console.log('Served by Amazon S3: ' + key);
    });
    //Pipe the s3 object to the response
    stream.pipe(res);
  });
};

exports.FileUploadService = FileUploadService;
