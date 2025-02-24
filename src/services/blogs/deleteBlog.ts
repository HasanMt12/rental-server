import Blog from '../../models/Blog';

const deleteBlogService = async (id: string) => {
    try {
        const blog = await Blog.findByIdAndDelete(id);
        return blog;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default deleteBlogService;
