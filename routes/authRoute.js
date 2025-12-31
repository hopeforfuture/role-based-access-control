const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("./../controllers/authController");

const verifyToken = require("./../middlewares/authMiddleware");

const { registerValidator, loginValidator } = require("../helpers/validator");

router.post("/register", registerValidator, registerUser);
router.post("/login", loginValidator, loginUser);
router.get("/profile", verifyToken, getProfile);

module.exports = router;
