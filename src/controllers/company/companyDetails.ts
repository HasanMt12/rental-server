import { NextFunction, Request, Response } from 'express';
import { getCompanyService } from '../../services/company';

const blogDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id = '' } = req.params;

    try {
        const data = await getCompanyService(id as string);
        res.status(200).json({
            status: 200,
            message: 'Company found successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default blogDetails;
