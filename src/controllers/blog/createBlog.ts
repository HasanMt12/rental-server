import { NextFunction, Request, Response } from 'express';
import { createBlogService } from '../../services/blogs';

const createBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { title, description, link, images } = req.body;

    try {
        if (!title || !description || !link || !images) {
            res.status(400).json({
                status: 400,
                error: 'Bad Request title, description, link and images are required',
            });
            return;
        }
        const blog = await createBlogService({
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
        res.status(201).json({
            status: 201,
            message: 'Blog created successfully',
            data: blog,
        });
    } catch (error) {
        console.log(error)
        next(error);
    }
};

export default createBlog;
