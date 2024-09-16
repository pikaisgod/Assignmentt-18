const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends');
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      console.log(req.body);
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);  // Log the error details to troubleshoot
      res.status(500).json(err);
    }
  },
  // Update a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      
      // Remove user's associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({ message: 'No user found with this ID' });
      }
      
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
