const User = require("./../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;
    const isExistUser = await User.findOne({ email });

    if (isExistUser) {
      return res.status(200).json({
        success: false,
        msg: "Email already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const userData = await user.save();

    return res.status(200).json({
      success: true,
      msg: "Register successfully!",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_SECRET_TOKEN,
    { expiresIn: "2h" }
  );
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        msg: "Email or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Email or password is incorrect",
      });
    }

    const token = generateAccessToken(user);

    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      success: true,
      accessToken: token,
      tokenType: "Bearer",
      data: safeUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const userData = await User.findOne({ _id: user_id });

    return res.status(200).json({
      success: true,
      msg: "Profile Data",
      data: userData,
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
