import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';
import express from "express";

dotenv.config();

import routes from './routes';

// Iniciando database
import './database';

const whiteList = [
  'http://project.school.s3-website-sa-east-1.amazonaws.com',
];

const corsOption = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();

// middlewares
app.use(cors(corsOption));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', 'uploads')));

// routes
app.use(routes);

export default app;
