import { NextFunction, Request, Response } from 'express';

import { deleteBlogService } from '../../services/blogs';

const deleteBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { id = '' } = req.params;

    try {
        const blog = await deleteBlogService(id as string);
        res.status(200).json({
            status: 200,
            message: 'Blog deleted successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

export default deleteBlog;
