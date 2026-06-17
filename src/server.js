require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully!");

    app.listen(port, () => {
      console.log(` Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Error starting server:", err);
  }
};

startServer();
