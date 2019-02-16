var express = require('express'),
  app = express(),
  multer = require('multer');

app.get('/upload', function(req, res) {
  res
    .status(200)
    .send(
      '<form method="POST" enctype="multipart/form-data">' +
        '<input type="file" name="file1"/><input type="submit"/>' +
        '</form>'
    )
    .end();
});
var upload = multer({ dest: 'uploads/' });

app.post(
  '/upload',
  upload.any(),
  //   multer({ limits: { fileSize: 10 * 1024 * 1024 } }),
  function(req, res) {
    console.log(req.files);

    if (!req.files || !req.files.file1) {
      return res
        .status(403)
        .send('expect 1 file upload named file1')
        .end();
    }
    var file1 = req.files.file1;
    console.log(file1);

    // this is mainly for user friendliness. this field can be freely tampered by attacker.
    if (!/^image\/(jpe?g|png|gif)$/i.test(file1.mimetype)) {
      return res
        .status(403)
        .send('expect image file')
        .end();
    }
  }
);

app.listen(process.env.PORT || 3000, function() {
  console.log('Example Server listening at port ' + (process.env.PORT || 3000));
});
