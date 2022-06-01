const Board = require("./../models/Board");
const List = require("./../models/List");
const Card = require("./../models/Card");
const { default: mongoose } = require("mongoose");

module.exports.getBoard = async (boardId, userId) => {
  const board = await Board.findOne({ _id: boardId, members: userId });

  return board;
};

module.exports.getAllList = async (boardId) => {
  boardId = mongoose.Types.ObjectId(boardId);

  const lists = await List.aggregate([
    { $match: { boardId: boardId } },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        as: "cards",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        cards: 1,
      },
    },
  ]);
  return lists;
};

module.exports.getList = async (listId) => {
  const lists = await List.aggregate([
    { $match: { _id: listId } },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        as: "cards",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        cards: 1,
      },
    },
  ]);
  console.log(lists);
  return lists;
};

module.exports.addList = async (boardId, name) => {
  const list = await List.create({
    name: name,
    boardId: boardId,
  });

  return list;
};

module.exports.deleteList = async (listId) => {
  const list = await List.findByIdAndDelete(listId);

  return list;
};

module.exports.renameList = async (listId, newName) => {
  const list = await List.findByIdAndUpdate(listId, { name: newName });

  return list;
};

module.exports.getCard = async (cardId) => {
  const card = await Card.findById(cardId);

  return card;
};

module.exports.getAllCard = async (listId) => {
  const cards = await Card.find({ listId: listId });

  return cards;
};

module.exports.addCard = async (listId, title) => {
  const card = await Card.create({
    listId: listId,
    title: title,
  });

  return card;
};

module.exports.deleteCard = async (cardId) => {
  const card = await Card.findByIdAndDelete(cardId);

  return card;
};
