import Company from '../../models/Company';

const companyDetailsService = async (id: string) => {
    try {
        const data = await Company.findById(id);
        if (!data) {
            throw new Error('Company not found');
        }
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default companyDetailsService;
