const profileService = require("../services/profile.service");

exports.getProfile = async (req, res, next) => {
  try {
    let profile = await profileService.getProfile(req.user._id);

    res.json({ success: true, data: profile });
  } catch (e) {
    next(e);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    let updatedUser = await profileService.updateProfile(
      req.user._id,
      req.body,
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    next(e);
  }
};

const changePassword = async (req, res, next) => {
  try {
    let { oldPassword, newPassword } = req.body;

    await profileService.changePassword(req.user._id, oldPassword, newPassword);

    res.json({ success: true, message: "Password changed successfully" });
  } catch (e) {
    console.log("password change err:", e.message);
    next(e);
  }
};

exports.changePassword = changePassword;
