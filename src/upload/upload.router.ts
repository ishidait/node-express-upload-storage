import path from 'path';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: 'us-west-1',
});
const bucketName = process.env.AWS_S3_BUCKET ?? '';

export const uploadRouter = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: (req, file, cb) => {
      cb(null, { appName: 'node-express-upload-storage' }); // Put any metadata here.
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // Max. 10MB x 10 files
});

uploadRouter.post('/', upload.array('files'), function (req, res, next) {
  console.log(req.files);
  console.log(req.body);
  res.json({ result: 'success', msg: `${req.files.length} files uploaded` });
});
