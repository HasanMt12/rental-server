import Blog from '../../models/Blog';

const blogDetailsService = async (id: string) => {
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            throw new Error('Blog not found');
        }
        return blog;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default blogDetailsService;
