import User from '../../models/User';

const getUsers = async (role: string) => {
  try {
    let query: {
      role?: string;
    } = {};
    if (role) {
      query.role = role;
    }
    const users = await User.find(query);
    return users;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default getUsers;
