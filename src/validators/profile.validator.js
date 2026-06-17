const { body } = require("express-validator");

exports.updateProfileValidator = [
  body("name", "Name cannot be empty").optional().trim().notEmpty(),
  body("phoneNumber", "Invalid phone number").optional().isMobilePhone(),
];

exports.changePasswordValidator = [
  body("oldPassword", "Old password is required").notEmpty(),

  body("newPassword", "New password must be at least 8 characters").isLength({
    min: 8,
  }),
];
