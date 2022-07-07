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
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

listSchema.post("findOneAndDelete", async function (doc) {
  console.log("running post remove list function");
  console.log(doc);
  if (doc) await Card.deleteMany({ listId: doc._id });
});

module.exports = mongoose.model("List", listSchema);
