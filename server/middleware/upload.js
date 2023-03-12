const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const access_key = '';
const secret_key = '';

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : access_key,
        secretAccessKey: secret_key
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

    while (true) {

        let response = S3.listObjectsV2(params).promise();

        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(
            `ContinuationToken = ${response.ContinuationToken ? response.ContinuationToken : null}`
        );
        console.log(
            `NextContinuationToken = ${
                response.NextContinuationToken ? response.NextContinuationToken : null
            }`
        );
        console.log(`  Object Lists`);
        for (let content of response.Contents) {
            console.log(
                `    Name = ${content.Key}, Size = ${content.Size}, Owner = ${content.Owner.ID}`
            );
        }

        if (response.IsTruncated) {
            params.ContinuationToken = response.NextContinuationToken;
        } else {
            break;
        }

    }

    // List Top Level Folder And Files
    params.Delimiter = "/";
    console.log("Top Level Folders And Files In The Bucket");
    console.log("==========================");

    while (true) {

        let response = S3.listObjectsV2(params).promise();

        console.log(`IsTruncated = ${response.IsTruncated}`);
        console.log(
            `ContinuationToken = ${response.ContinuationToken ? response.ContinuationToken : null}`
        );
        console.log(
            `NextContinuationToken = ${
                response.NextContinuationToken ? response.NextContinuationToken : null
            }`
        );

        console.log(`  Folder Lists`);
        for (let folder of response.CommonPrefixes) {
            console.log(`    Name = ${folder.Prefix}`);
        }

        console.log(`  File Lists`);
        for (let content of response.Contents) {
            console.log(
                `    Name = ${content.Key}, Size = ${content.Size}, Owner = ${content.Owner.ID}`
            );
        }

        if (response.IsTruncated) {
            params.ContinuationToken = response.NextContinuationToken;
        } else {
            break;
        }
    }
    next()
}

module.exports = {upload, getFileList}