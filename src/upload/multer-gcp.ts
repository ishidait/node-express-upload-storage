import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-google-storage';

export const uploadGCP = multer({
  storage: new MulterGoogleCloudStorage(),
});
