import Company from '../../models/Company';

const deleteCompanyService = async (id: string) => {
    try {
        const data = await Company.findByIdAndDelete(id);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
};

export default deleteCompanyService;
