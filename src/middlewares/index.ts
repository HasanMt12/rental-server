import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import routes from '../routes';
import globalError from './globalError';
import logger from './logger';

const applyMiddleware = (app: Application): void => {
  app.use(
    cors({
      origin: ['http://localhost:5173', 'http://rentalseba.com', 'https://rentalseba.com', 'https://rentalseba.netlify.app'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);
  app.use(routes);
  app.use(globalError);
};

export default applyMiddleware;
