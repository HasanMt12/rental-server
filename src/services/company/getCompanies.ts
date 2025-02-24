import Company from '../../models/Company';

const allCompanyService = async (
    search: string,
    page: number,
    limit: number
) => {
    try {
        const pageNumber = page || 1;
        const limitNumber = limit || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const totalCount = await Company.countDocuments({
            name: { $regex: search, $options: 'i' },
            status: 'approved',
        });
        if (totalCount === 0) {
            throw new Error('Company not found');
        }
        if (pageNumber > Math.ceil(totalCount / limitNumber)) {
            throw new Error('Page not found');
        }
        const data = await Company.find({
            name: { $regex: search, $options: 'i' },
            status: 'approved',
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        return {
            totalCount,
            data,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalCount / limitNumber),
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default allCompanyService;
