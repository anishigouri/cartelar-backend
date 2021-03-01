import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import './database';
import 'reflect-metadata';
import upload from './config/upload';

const app = express();

const whitelist = [
  'https://cartelar-frontend.herokuapp.com',
  'http://localhost:3000',
];

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

app.listen(3333, () => {
  console.log('🥰 Backend started port 3333');
});
