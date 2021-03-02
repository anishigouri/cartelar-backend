import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
import 'express-async-errors';
import './database';
import 'reflect-metadata';
import upload from './config/upload';
import AppError from './errors/AppError';

import routes from './routes';
import './container';

const app = express();

// const whitelist = [
//   'https://cartelar-frontend.herokuapp.com',
//   'http://localhost:3000',
// ];

// const corsOptions = {
//   origin(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));

dotenv.config();
app.use(express.json());
app.use('/files', express.static(upload.director));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Opss... Ocorreu um erro inesperado em nosso sistema :(',
  });
});

app.listen(3333, () => {
  console.log('🥰 Backend started port 3333');
});
