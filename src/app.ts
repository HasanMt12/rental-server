import express, { Request, Response } from 'express';
import applyMiddleware from './middlewares';

// express app
const app = express();
applyMiddleware(app);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Server health Ok' });
});

export default app;
