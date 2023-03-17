const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: process.env.ACCESSKEY,
        secretAccessKey: process.env.SECRETKEY
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
    let fileList = async () => {
        let response = await S3.listObjectsV2(params).promise();
        for (let content of response.Contents) {
            console.log(
                `    Name = ${content.Key}, Size = ${content.Size}, Owner = ${content.Owner.ID}`
            );
        }
    }

    fileList().then(() => next())

}

    module.exports = {upload, getFileList}