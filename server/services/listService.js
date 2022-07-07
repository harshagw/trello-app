const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.getAllList = async (boardId) => {
  boardId = mongoose.Types.ObjectId(boardId);

  const lists = await List.aggregate([
    { $match: { boardId: boardId } },
    {
      $sort: {
        order: 1,
      },
    },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        as: "cards",
        pipeline: [
          {
            $sort: {
              order: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        order: 1,
        cards: 1,
      },
    },
  ]);

  return lists;
};

module.exports.getList = async (listId) => {
  const lists = await List.aggregate([
    { $match: { _id: ObjectId(listId) } },
    {
      $lookup: {
        from: "cards",
        localField: "_id",
        foreignField: "listId",
        as: "cards",
        pipeline: [
          {
            $sort: {
              order: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        order: 1,
        cards: 1,
      },
    },
  ]);

  return lists[0];
};

module.exports.addList = async (boardId, name) => {
  const lists = await List.find({ boardId: boardId });
  let new_order = 1;

  new_order += lists.length;

  const list = await List.create({
    name: name,
    boardId: boardId,
    order: new_order,
  });

  return list;
};

module.exports.deleteList = async (listId) => {
  const list = await List.findByIdAndDelete(listId);
  console.log(list);

  const lists = await List.find({ boardId: list.boardId });
  let new_order = 1;

  new_order += lists.length;

  for (let i = list.order + 1; i <= new_order; i++) {
    console.log("runnning find one and update");
    await List.findOneAndUpdate(
      { boardId: list.boardId, order: i },
      {
        order: i - 1,
      }
    );
  }

  return list;
};

module.exports.renameList = async (listId, newName) => {
  const list = await List.findByIdAndUpdate(listId, { name: newName });

  return list;
};

module.exports.reorderList = async (data) => {
  if (data.oldOrder < data.newOrder) {
    for (let i = data.oldOrder + 1; i <= data.newOrder; i++) {
      console.log("runnning find one and update");
      await List.findOneAndUpdate(
        { boardId: data.boardId, order: i },
        {
          order: i - 1,
        }
      );
    }
  } else {
    for (let i = data.oldOrder - 1; i >= data.newOrder; i--) {
      console.log("runnning find one and update 2");
      await List.findOneAndUpdate(
        { boardId: data.boardId, order: i },
        {
          order: i + 1,
        }
      );
    }
  }

  await List.findOneAndUpdate(
    { boardId: data.boardId, _id: data.listId },
    {
      order: data.newOrder,
    }
  );

  return;
};
