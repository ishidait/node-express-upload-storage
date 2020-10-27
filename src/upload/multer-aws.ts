import multer, { Multer } from 'multer';
import multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: 'us-west-1',
});
const bucketName = process.env.AWS_S3_BUCKET ?? '';

const storageAWS = multerS3({
  s3: s3,
  bucket: bucketName,
  metadata: (req, file, cb) => {
    cb(null, { appName: 'node-express-upload-storage' }); // Put any metadata here.
  },
  key: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadToAWS = multer({
  storage: storageAWS,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // Max. 10MB x 10 files
});
