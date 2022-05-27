const mongoose = require("mongoose");
const Card = require("./Card");

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
  },
  { timestamps: true }
);

listSchema.pre("remove", async function (next) {
  const list = this;
  await Card.deleteMany({ listId: list._id });
  next();
});

module.exports = mongoose.model("List", listSchema);
