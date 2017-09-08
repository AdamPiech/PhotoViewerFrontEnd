var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var bucket = 'photoviewerstore';

var putFiles = function(formData) {

    alert(config.accessKeyId);
    alert(config.region);

    const photos = formData.getAll('photos');

    for (var i in photos) {
        alert(photos[i]);
        alert(photos[i].name);
        putFile(photos[i]);
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
            alert(err.message);
            alert('There was an error uploading your photo: ', err.message);
        }
    });
}


exports.putFiles = putFiles;
exports.putFile = putFile;