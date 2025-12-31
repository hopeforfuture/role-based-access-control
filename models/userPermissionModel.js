const mongoose = require("mongoose");

const userPermissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    permissions: [
      {
        permission_name: String,
        permission_values: [Number], //0->create, 1->read, 2->edit, 3->delete
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserPermission", userPermissionSchema);
