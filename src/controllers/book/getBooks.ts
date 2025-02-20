import { NextFunction, Request, Response } from 'express';
import { getBooksService } from '../../services/book';
import findUserByProperty from '../../services/user/findUserByProperty';

const getBooks = async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const { user } = req;
  const { status } = req.query;
  try {
    const isUserExists = await findUserByProperty('email', user.email);
    if (!isUserExists) {
      res.status(404).json({
        status: 404,
        message: 'User not found',
      });
      return;
    }
    const books = await getBooksService(isUserExists._id.toString(), user.role, status as string);

    res.status(200).json({
      status: 200,
      message: `Books fetched successfully for ${user.role}`,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

export default getBooks;
