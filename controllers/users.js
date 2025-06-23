import User from '../models/User.js';

// GET user

const UserController = {
  get: async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
};

export default UserController;
