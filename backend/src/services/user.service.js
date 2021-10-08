import User from '../models/user.model';

class UserService {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async create(userData) {
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    const savedUser = await user.save();
    return savedUser.id;
  }
}

export default new UserService();
