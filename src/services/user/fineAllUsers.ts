import User from '../../models/User';

const findAllUsers = async () => {
  try {
    const users = await User.find().sort({ role: 1 });
    return users;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default findAllUsers;
