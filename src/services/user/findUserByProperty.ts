import User, { IUser as UserType } from '../../models/User';

const findUserByProperty = async (property: string, value: string): Promise<UserType | null> => {
  try {
    const user = await User.findOne({
      [property]: value,
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default findUserByProperty;
