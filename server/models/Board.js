const mongoose = require("mongoose");
const List = require("./List");

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
      trim: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

boardSchema.pre("remove", async function (next) {
  const board = this;
  await List.deleteMany({ boardId: board._id });
  next();
});

module.exports = mongoose.model("Board", boardSchema);
