import path from 'path';
import express, { RequestHandler } from 'express';
import multer, { Multer } from 'multer';
import { uploadToAWS } from './multer-aws';
import { uploadToAzure } from './multer-azure';
import { uploadGCP } from './multer-gcp';

export const uploadRouter = express.Router();

const storageDisk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const uploadToDisk = multer({
  storage: storageDisk,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // Max. 10MB x 10 files
});

const handler: RequestHandler = (req, res) => {
  console.log(req.files);
  console.log(req.body);

  res.json({ result: 'success', msg: `${req.files.length} files uploaded` });
};

uploadRouter.post('/disk', uploadToDisk.array('files'), handler);
uploadRouter.post('/aws', uploadToAWS.array('files'), handler);
uploadRouter.post('/azure', uploadToAzure.array('files'), handler);
uploadRouter.post('/gcp', uploadGCP.array('files'), handler);
