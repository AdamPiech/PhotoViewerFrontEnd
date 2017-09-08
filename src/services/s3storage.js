var AWS = require('aws-sdk');
var config = new AWS.Config();
var s3 = new AWS.S3(config);

var bucket = 'photoviewerstore';

var putFiles = function(fileList) {
    for (file in fileList) {
        putFile(file, file.name);
    }
}

var putFile = function(file) {
    var photoKey = albumPhotosKey + fileName;
    s3.upload({
        Key: file.name,
        Body: file,
        ACL: 'public-read'
    }, function(err, data) {
        if (err) {
            return alert('There was an error uploading your photo: ', err.message);
        }
    });
}


exports.putFiles = putFiles;
exports.putFile = putFile;