import multer from 'multer';
const MulterAzureStorage = require('multer-azure-storage');

const storageAzure = new MulterAzureStorage({
  azureStorageAccount: process.env.AZURE_STORAGE_ACCOUNT,
  azureStorageAccessKey: process.env.AZURE_STORAGE_ACCESSKEY,
  containerName: process.env.AZURE_STORAGE_CONTAINER,
});

export const uploadToAzure = multer({
  storage: storageAzure,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // Max. 10MB x 10 files
});
