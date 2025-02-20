import { NextFunction, Request, Response } from 'express';

const globalError = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const error = err.message ?? 'Server Internal Error';
  const status = err.status ?? 500;
  res.status(status).json({ status, error });
};

export default globalError;
