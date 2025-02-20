import { NextFunction, Request, Response } from 'express';
import { getContactsService } from '../../services/contact';

const getContacts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contacts = await getContactsService();
    res.status(200).json({
      status: 200,
      message: 'Successfully retrieved contacts',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export default getContacts;
