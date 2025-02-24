import { NextFunction, Request, Response } from 'express';
import { createCompanyService } from '../../services/company';

const createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, link, image } = req.body;

    try {
        if (!link || !image) {
            res.status(400).json({
                status: 400,
                error: 'Bad Request link & image are required',
            });
            return;
        }
        const data = await createCompanyService({
            name,
            link,
            image,
        });

        if (!data) {
            res.status(400).json({
                status: 400,
                error: 'Company not created',
            });
            return;
        }
        res.status(201).json({
            status: 201,
            message: 'Company created successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default createCompany;
