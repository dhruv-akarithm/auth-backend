const sendResponse = (res, statusCode, success, message, data) => {
  const payload = { success, message };
  if (data) payload.data = data;
  return res.status(statusCode).json(payload);
};

module.exports = sendResponse;
