const sendResponse = require("../utils/response.util");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return sendResponse(res, 409, false, "Record already exists");
  }

  if (err.name === "ValidationError") {
    return sendResponse(res, 400, false, err.message);
  }

  if (err.statusCode) {
    return sendResponse(res, err.statusCode, false, err.message);
  } else {
    return sendResponse(res, 500, false, "Internal Server Error");
  }
};

module.exports = errorHandler;
