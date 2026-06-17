const { verifyToken } = require("../utils/jwt.util");
const User = require("../models/user.model");
const sendResponse = require("../utils/response.util");

const authenticate = async (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(res, 401, false, "Please login first");
  }

  try {
    let token = authHeader.split(" ")[1];
    let decoded = verifyToken(token);

    if (!decoded) {
      return sendResponse(res, 401, false, "Invalid or expired token");
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return sendResponse(res, 401, false, "User no longer exists");
    }
    if (user.isActive === false) {
      return sendResponse(res, 403, false, "Your account is deactivated");
    }

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return sendResponse(res, 500, false, "Server error during authentication");
  }
};

module.exports = authenticate;
