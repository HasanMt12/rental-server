import Blog from '../../models/Blog';

const updateBlogService = async (id: string, blogData: any) => {
    try {
        const blog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
        return blog;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default updateBlogService;
