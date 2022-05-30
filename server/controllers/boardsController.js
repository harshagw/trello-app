const Board = require("../models/Board");

const getAllBoards = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const boards = await Board.find({ members: userId }).sort({
      createdAt: "descending",
    });
    res.status(200).json({ data: boards });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBoard = async (req, res, next) => {
  const boardId = req.params.id;
  if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(501).json({ message: "Board ID is not valid" });
  }
  const userId = req.user._id;

  try {
    const board = await Board.findOne({
      _id: boardId,
      adminId: userId,
    });

    if (!board) {
      return res.status(404).json({ message: "No such Board Found!" });
    }

    res.status(200).json({ data: board, message: "board found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBoard = async (req, res, next) => {
  const userId = req.user._id;

  const board = new Board({
    ...req.body,
    description: "",
    adminId: userId,
  });

  try {
    await board.save();
    res.status(201).json({ data: board, message: "Project has been added." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBoard = async (req, res, next) => {
  const boardId = req.params.id;

  if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(501).json({ message: "Board ID is not valid" });
  }

  const userId = req.user._id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }

  try {
    const board = await Board.findOne({ _id: boardId, adminId: userId });

    if (!board) {
      return res.status(404).json({ message: "No such board" });
    }

    updates.forEach((update) => {
      board[update] = req.body[update];
    });

    await board.save();

    res.status(200).json({ data: board, message: "board has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBoard = async (req, res, next) => {
  const boardId = req.params.id;
  if (!boardId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(501).json({ message: "Board ID is not valid" });
  }
  const userId = req.user._id;

  try {
    const board = await Board.findOneAndDelete({
      _id: boardId,
      adminId: userId,
    });

    if (!board) {
      return res.status(404).json({ message: "No such Board Found!" });
    }

    res.status(200).json({ message: "Board has been deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllBoards, getBoard, addBoard, updateBoard, deleteBoard };
