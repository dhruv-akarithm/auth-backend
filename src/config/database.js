const mongoose = require("mongoose");

module.exports = async () => {
  return await mongoose.connect(process.env.MONGODB_URI);
};
