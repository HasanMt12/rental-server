import { NextFunction, Request, Response } from 'express';

import { updateCompanyService } from '../../services/company';

const updateCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, link, image } = req.body;
    const { id } = req.params;

    try {
        const data = await updateCompanyService(id, {
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
        res.status(200).json({
            status: 200,
            message: 'Company updated successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export default updateCompany;
