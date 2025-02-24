import { NextFunction, Request, Response } from 'express';
import { getCompaniesService } from '../../services/company';

const allCompanies = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const data = await getCompaniesService(
            String(search),
            Number(page),
            Number(limit)
        );
        if (!data) {
            res.status(404).json({
                status: 404,
                error: 'Company not found',
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: 'Companies fetched successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default allCompanies;
