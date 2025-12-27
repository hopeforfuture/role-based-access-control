const express = require("express");
const router = express.Router();

const { registerUser } = require("./../controllers/authController");

const { registerValidator } = require("../helpers/validator");

router.post("/register", registerValidator, registerUser);

module.exports = router;
