import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { itemsRouter } from './items/items.router';
import { uploadRouter } from './upload/upload.router';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';

/** App Variables */
if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
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

/** Webpack HMR Activation */
type ModuleId = string | number;
interface WebpackHotModule {
  hot?: {
    data: any;
    accept(dependencies: string[], callback?: (updatedDependencies: ModuleId[]) => void): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}
declare const module: WebpackHotModule;
if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
