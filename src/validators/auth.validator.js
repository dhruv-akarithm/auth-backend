const { body } = require("express-validator");

exports.signupValidator = [
  body("name", "Name is required").trim().notEmpty(),

  body("email", "Please provide a valid email").isEmail(),

  body("password", "Password must be at least 8 characters").isLength({
    min: 8,
  }),
];

exports.loginValidator = [
  body("email", "Valid email is required").isEmail(),
  body("password", "Password is required").notEmpty(),
];
