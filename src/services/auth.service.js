const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const throwErr = (msg, code) => {
  let error = new Error(msg);
  error.statusCode = code;
  throw error;
};

const signup = async (name, email, password) => {
  let userExists = await User.findOne({ email });
  if (userExists) {
    throwErr("Email is already registered", 409);
  }

  let newUser = await User.create({ name, email, password });

  let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  };
};

const login = async (email, password) => {
  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    throwErr("Invalid email or password", 401);
  }

  let isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throwErr("Invalid email or password", 401);
  }

  let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const getMe = async (userId) => {
  return await profileService.getProfile(userId);
};

module.exports = { signup, login, getMe };
