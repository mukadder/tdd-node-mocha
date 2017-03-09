/**
 * Created by mukadder on 3/9/17.
 */
var express = require('express')
    , router = express.Router()
    , aws = require('aws-sdk')

router.get('/', function(req, res) {
    res.render('index')
})
/*
 Let’s look what we have hear.

 There are two request handlers. The first renders our page, which we will look at in a minute.

 The second handler uses the AWS SDK to request that S3 generates a temporary URL where you can upload your file. This URL is valid only for 60 seconds, as per the Expires option.

 Once the request is successfully returned you send back the generated URL.


 */
var AWS_ACCESS_KEY = 'your_AWS_access_key'
var AWS_SECRET_KEY = 'your_AWS_secret_key'
var S3_BUCKET = 'images_upload'

router.get('/sign', function(req, res) {
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});

    var s3 = new aws.S3()
    var options = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', options, function(err, data){
        if(err) return res.send('Error with S3')

        res.json({
            signed_request: data,
            url: 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + req.query.file_name
        })
    })
})

module.exports = router