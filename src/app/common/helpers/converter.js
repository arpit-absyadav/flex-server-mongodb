/*
 * @Author: Arpit.Yadav
 * @Date: 2019-02-10 12:35:36
 * @Last Modified by: Arpit.Yadav
 * @Last Modified time: 2019-02-10 12:40:52
 */

// Converting binanry data to ASCII
exports.BinaryToAscii = str => {
  var buffer;
  buffer = Buffer.from(str.toString(), 'binary');
  return buffer.toString('base64');
};

// Converting ASCII data to binanry
exports.AsciiToBinary = str => Buffer.from(str, 'base64').toString('binary');
