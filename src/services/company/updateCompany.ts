import Company from '../../models/Company';
const updateCompanyService = async (id: string, companyData: any) => {
    try {
        const data = await Company.findByIdAndUpdate(id, companyData, {
            new: true,
        });
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default updateCompanyService;
