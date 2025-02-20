import { NextFunction, Request, Response } from 'express';
import findContactByProperty from '../../services/contact/findContactByProperty';

const deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await findContactByProperty('_id', id);
    if (!contact) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
      return;
    }
    const deletedContact = await contact.deleteOne();
    if (deletedContact.deletedCount === 0) {
      res.status(500).json({
        status: 500,
        message: 'Failed to delete contact',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully deleted contact',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteContact;
