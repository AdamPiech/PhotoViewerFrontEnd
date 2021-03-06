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
    listFiles();
}

var listFiles = function() {
    alert('listowanie plików');
    s3.listObjects({
        Bucket: bucket
    }, function(err, data){
    var bucketContents = data.Contents;
    for (var i = 0; i < bucketContents.length; i++) {
        var urlParams = {
            Bucket: bucket, 
            Key: bucketContents[i].Key
        };
        s3.getSignedUrl('getObject', urlParams, function(err, url) {
            alert('the url of the image is', url);
            if (err) {
                alert(err.message);
                alert('There was an error list your photos: ', err.message);
            }
        });
    }
});
}

exports.putFiles = putFiles;
exports.putFile = putFile;