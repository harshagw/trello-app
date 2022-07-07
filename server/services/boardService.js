const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.getAllBoard = async (userId) => {
  const boards = await Board.find({ members: userId }).populate("members", ["name", "email"]);

  return boards;
};

module.exports.addBoard = async (userId, name) => {
  const board = new Board({
    name: name,
    description: "",
    adminId: userId,
    members: [userId],
  });

  await board.save();

  return board;
};

module.exports.getBoard = async (boardId, userId) => {
  const board = await Board.findOne({ _id: boardId, members: userId }).populate("members", ["name", "email"]);

  return board;
};

module.exports.updateBoard = async (boardId, data) => {
  const updates = Object.keys(data);
  const allowedUpdates = ["name", "description"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return "not a valid operations";
  }

  try {
    const board = await Board.findOne({
      _id: boardId,
    });

    if (!board) {
      return "cannot find the board";
    }

    updates.forEach((update) => {
      board[update] = data[update];
    });

    await board.save();

    return board;
  } catch (err) {
    console.log(err);
    return "not a valid response";
  }
};

module.exports.deleteBoard = async (boardId) => {
  await Board.findByIdAndDelete(boardId);
};

module.exports.addMemberToBoard = async (boardId, memberId) => {
  console.log("adding member - ", boardId);
  await Board.findByIdAndUpdate(boardId, { $push: { members: memberId } });
};
