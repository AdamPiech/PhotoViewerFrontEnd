var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var bucket = 'photoviewerstore';
var s3Bucket = new AWS.S3({ 
    params: {
        Bucket: bucket
    } 
})

var putFiles = function(formData) {

    alert(bucket);
    alert(AWS.config.accessKeyId);
    alert(AWS.config.region);

    const photos = formData.getAll('photos');

    for (var i in photos) {
        alert(photos[i]);
        alert(photos[i].name);
        putFile(photos[i]);
    }

}

var putFile = function(file) {
    s3Bucket.putObject({
        Key: file.name,
        Body: file
    }, function(err, data) {
        if (err) {
            alert(err.message);
            alert('There was an error uploading your photo: ', err.message);
        }
    });
}


exports.putFiles = putFiles;
exports.putFile = putFile;