const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invite", inviteSchema);
