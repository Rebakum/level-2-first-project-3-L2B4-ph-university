import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import AppError from './app/Errors/appErrorr';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
//api/v1/students/create-student
app.use('/api/v1/', router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = async (req: Request, res: Response) => {
  Promise.reject();
  throw new AppError(httpStatus.NOT_FOUND, '');
};
app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
