import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { itemsRouter } from './items/items.router';
import { uploadRouter } from './upload/upload.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';

/** App Variables */
const PORT: number = parseInt(process.env.PORT ?? '3000', 10);
const app = express();

/** App Configuration */
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/items', itemsRouter);
app.use('/upload', uploadRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/** Server Activation */
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
