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

boardSchema.post("findOneAndDelete", async function (doc) {
  console.log("running post remove board function");
  console.log(doc);
  // const lists = List.find({ boardId: doc._id });
  // for (var i = 0; i < lists.length; i++) {
  //   console.log(lists[i]);
  //   await List.findByIdAndDelete(lists[i]._id);
  // }
});

module.exports = mongoose.model("Board", boardSchema);
