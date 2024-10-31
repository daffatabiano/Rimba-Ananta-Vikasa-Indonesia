import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(400).json({
        success: false,
        message: null,
        requestId: newUser._id,
        data: null,
      });
    } else {
      const newUser = await User.create(req.body);

      res.status(201).json({
        success: true,
        message: null,
        requestId: newUser._id,
        data: newUser,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'User not found',
        requestId: null,
      });
    }

    if (user.password !== req.body.password) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid password',
        requestId: null,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        accessToken: user._id,
        refreshToken: user._id,
        expires: Date.now() + 3600000,
        user: user,
      },
      message: null,
      requestId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
