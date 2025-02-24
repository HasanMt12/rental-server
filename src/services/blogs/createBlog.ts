import Blog from '../../models/Blog';
import type { IBlogCreate } from '../../models/Blog';

type IBlogInsert = typeof IBlogCreate;
const createBlogService = async (blog: IBlogInsert) => {
    try {
        const createdBlog = await Blog.create(blog);
        await createdBlog.save();
        return createdBlog;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default createBlogService;
