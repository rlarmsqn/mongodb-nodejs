const {accessKey} = require("../config/secure");
const {secretKey} = require("../config/secure");
const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : accessKey,
        secretAccessKey: secretKey
    }
});

let upload = (req, res, next) => {
    console.log(req.body)
    // upload file
    S3.putObject({
        Bucket: 'boo',
        Key: req.body.name,
        Body: JSON.stringify(req.body.file)
    }).promise().then(() => next());
};

let getFileList = (req, res, next) => {
    let params = {
        Bucket: 'boo',
        MaxKeys: 300,
        FetchOwner: true
    }
    // List All Objects
    console.log("List All In The Bucket");
    console.log("==========================");

    let response = S3.listObjectsV2(params).promise();

    console.log(response)
    next()
}

module.exports = {upload, getFileList}