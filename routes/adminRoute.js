const express = require("express");
const router = express.Router();
const {
  addPermission,
} = require("./../controllers/admin/permissionController");
const auth = require("./../middlewares/authMiddleware");
const { permissionAddValidator } = require("../helpers/adminValidator");
router.post("/add-permission", auth, permissionAddValidator, addPermission);

module.exports = router;
