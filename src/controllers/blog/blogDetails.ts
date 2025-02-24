import { NextFunction, Request, Response } from 'express';
import { getBlogService } from '../../services/blogs';

const blogDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id = '' } = req.params;

    try {
        const blog = await getBlogService(id as string);
        res.status(200).json({
            status: 200,
            message: 'Blog found successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

export default blogDetails;
