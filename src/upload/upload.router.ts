import path from 'path';
import express from 'express';
import multer from 'multer';

export const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // Max. 10MB x 10 files
});

uploadRouter.post('/', upload.array('files'), function (req, res, next) {
  console.log(req.files);
  console.log(req.body);
  res.json({ result: 'success', msg: `${req.files.length} files uploaded` });
});
