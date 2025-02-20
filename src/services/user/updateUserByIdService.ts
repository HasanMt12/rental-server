import User from '../../models/User';

type UserType = {
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  role?: 'user' | 'lessor' | 'admin';
};

const updateUserByIdService = async (userId: String, userData: UserType): Promise<UserType | undefined> => {
  const { name, email, password, photo, role } = userData;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.password = password ?? user.password;
    user.photo = photo ?? user.photo;
    user.role = role ?? user.role;
    user.updatedAt = new Date();
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default updateUserByIdService;
