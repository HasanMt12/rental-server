import Blog from '../../models/Blog';

const allBlogService = async (search: string, page: number, limit: number) => {
    try {
        const pageNumber = page || 1;
        const limitNumber = limit || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const totalBlogs = await Blog.countDocuments({
            title: { $regex: search, $options: 'i' },
            description: { $regex: search, $options: 'i' },
            status: true,
        });
        if (totalBlogs === 0) {
            throw new Error('Blogs not found');
        }
        if (pageNumber > Math.ceil(totalBlogs / limitNumber)) {
            throw new Error('Page not found');
        }
        const blogs = await Blog.find({
            title: { $regex: search, $options: 'i' },
            description: { $regex: search, $options: 'i' },
            status: true,
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        return {
            totalCount: totalBlogs,
            rows: blogs,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalBlogs / limitNumber),
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default allBlogService;
