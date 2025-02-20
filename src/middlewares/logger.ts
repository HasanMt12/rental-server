import { NextFunction, Request, Response } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, headers, body } = req;
  const { statusCode } = res;
  const log = {
    headers,
    body,
    method,
    url,
    statusCode,
  };
  console.log(log);
  next();
};

export default logger;
