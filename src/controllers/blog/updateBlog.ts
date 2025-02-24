import { NextFunction, Request, Response } from 'express';
import { updateBlogService } from '../../services/blogs';

const updateBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { title, description, link, images } = req.body;
    const { id = '' } = req.params;

    try {
        const blog = await updateBlogService(id as string, {
            title,
            description,
            link,
            images,
        });

        if (!blog) {
            res.status(400).json({
                status: 400,
                error: 'Blog not created',
            });
            return;
        }
        res.status(200).json({
            status: 200,
            message: 'Blog updated successfully',
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

export default updateBlog;
