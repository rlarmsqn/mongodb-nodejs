const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const accessKey = process.env.ACCESS_KEY
const secretKey = process.env.SECRET_KEY

let imageUpload = (req, res, next) => {
    const upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: 'boo',
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key(req, file, cb) {
                cb(null, `${Date.now()}_${path.basename(file.originalname)}`)
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024},
    })
    // upload file
    /*S3.putObject({
        Bucket: 'boo',
        Key: req.body.name,
        Body: req.body.file
    });*/
    next()
};

let getFileList = (req, res, next) => {
    next()
}

module.exports = {imageUpload, getFileList}