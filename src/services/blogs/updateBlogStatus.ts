import Blog from '../../models/Blog';

const toggleBlogStatus = async (id: string) => {
    try {
        const isExist = await Blog.findById(id);
        if (!isExist) {
            throw new Error('Blog not found');
        }
        const blog = await Blog.findByIdAndUpdate(
            id,
            { status: !isExist?.status },
            { new: true }
        );
        return blog;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default toggleBlogStatus;
