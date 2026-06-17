const express = require("express");
const app = express();

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");

const errorHandler = require("./middlewares/error.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.send("ping! server is running.");
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.use(errorHandler);

module.exports = app;
