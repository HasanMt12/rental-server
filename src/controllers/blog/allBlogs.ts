import { NextFunction, Request, Response } from 'express';
import { getBlogsService } from '../../services/blogs';

const allBlogs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const blogs = await getBlogsService(
            String(search),
            Number(page),
            Number(limit)
        );
        if (!blogs) {
            res.status(404).json({
                status: 404,
                error: 'Blogs not found',
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: 'Blogs fetched successfully',
            data: blogs,
        });
    } catch (error) {
        next(error);
    }
};

export default allBlogs;
