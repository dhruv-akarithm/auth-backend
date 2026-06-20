const authService = require("../services/auth.service");
const sendResponse = require("../utils/response.util");

const signup = async (req, res, next) => {
  try {
    let result = await authService.signup(
      req.body.name,
      req.body.email,
      req.body.password,
    );

    return sendResponse(res, 201, true, "Account created successfully", result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let result = await authService.login(email, password);

    return sendResponse(res, 200, true, "Logged in successfully", result);
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    let userData = await authService.getMe(req.user._id);

    return sendResponse(res, 200, true, "Profile fetched", userData);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout();

    return sendResponse(res, 202, true, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getMe, logout };
