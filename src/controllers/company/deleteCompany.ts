import { NextFunction, Request, Response } from 'express';
import { deleteCompanyService } from '../../services/company';

const deleteCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id = '' } = req.params;

    try {
        const data = await deleteCompanyService(id as string);
        res.status(200).json({
            status: 200,
            message: 'Company deleted successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default deleteCompany;
