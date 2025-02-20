import User, { IUser as UserType } from '../../models/User';
import { CreateUserInput } from '../../validation/auth/createUser';

const createUserService = async (user: CreateUserInput): Promise<UserType | null> => {
  const { email, name, password, photo, role } = user;
  try {
    const createdUser = await User.create({
      name,
      email,
      password,
      photo,
      role: role || 'user',
    });
    await createdUser.save();
    return createdUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default createUserService;
