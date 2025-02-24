import Company from '../../models/Company';
import type { ICompanyCreate } from '../../models/Company';

const createCompanyService = async (blog: ICompanyCreate) => {
    try {
        const data = await Company.create(blog);
        await data.save();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default createCompanyService;
