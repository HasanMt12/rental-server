import { NextFunction, Request, Response } from 'express';
import { createContactService } from '../../services/contact';

const createContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await createContactService({ name, email, phone, message });
    if (!contact) {
      res.status(400).json({
        status: 400,
        message: 'Bad request',
      });
      return;
    }
    res.status(201).json({
      status: 201,
      message: 'Contact created',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export default createContact;
