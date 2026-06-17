const User = require("../models/user.model");

const throwErr = (msg, code) => {
  let error = new Error(msg);
  error.statusCode = code;
  throw error;
};

const getProfile = async (userId) => {
  let user = await User.findById(userId);

  if (!user) {
    throwErr("User not found", 404);
  } else {
    return user;
  }
};

const updateProfile = async (userId, updateData) => {
  let { name, phoneNumber } = updateData;

  let user = await User.findByIdAndUpdate(
    userId,
    { name, phoneNumber },
    { new: true, runValidators: true },
  );

  if (!user) throwErr("User not found", 404);
  else {
    return user;
  }
};

const changePassword = async (userId, oldPass, newPass) => {
  let user = await User.findById(userId).select("+password");

  if (!user) throwErr("User not found", 404);

  let isMatch = await user.comparePassword(oldPass);
  if (!isMatch) {
    throwErr("Incorrect old password", 400);
  } else {
    user.password = newPass;
    await user.save();
  }
};

module.exports = { getProfile, updateProfile, changePassword };
