const { check } = require("express-validator");

exports.registerValidator = [
  check("name").notEmpty().withMessage("Name required"),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Not a valid email")
    .normalizeEmail({
      gmail_remove_dots: true,
    }),

  check("password").notEmpty().withMessage("Password required"),
];
