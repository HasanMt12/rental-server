import { NextFunction, Request, Response } from 'express';
import { toggleBlogStatus } from '../../services/blogs';

const blogDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id = '' } = req.params;

    try {
        const blog = await toggleBlogStatus(id as string);
        res.status(200).json({
            status: 200,
            message: 'Blog status updated successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

export default blogDetails;
