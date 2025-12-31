const { check } = require("express-validator");

exports.permissionAddValidator = [
  check("permission_name").notEmpty().withMessage("Permission name required"),
];
