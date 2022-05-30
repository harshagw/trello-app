const { isValidObjectId } = require("mongoose");
const Board = require("../models/Board");
const {
  getBoard,
  getAllList,
  addList,
  getList,
  deleteList,
  renameList,
} = require("./boardService");

module.exports.verifyBoard = async (socket, next) => {
  console.log("checking the board validity");
  const boardId = socket.handshake.query.boardId;
  const userId = socket.user._id;

  if (!isValidObjectId(boardId) || !isValidObjectId(userId)) {
    next(new Error("invalid board id"));
    return;
  }

  const board = await getBoard(boardId, userId);

  if (board) {
    socket.board = board;
    next();
  } else {
    next(new Error("board doens't exist."));
    return;
  }
};

module.exports.handler = async (io, socket) => {
  console.log("new connection - ", socket.id);

  const userId = socket.user._id;
  const boardId = socket.handshake.query.boardId;
  const roomId = `board-${boardId}`;
  socket.join(roomId);

  if (!userId || !boardId) {
    socket.disconnect();
  }

  const lists = await getAllList(boardId);

  socket.emit("board:get", { board: socket.board, lists: lists });

  socket.on("list:add", async (data) => {
    console.log("add list - ", data);

    const l = await addList(boardId, data.name);
    const list = await getList(l["_id"]);

    io.to(roomId).emit("list:added", list[0]);
  });

  socket.on("list:delete", async (data) => {
    console.log("delete list - ", data);

    await deleteList(data._id);

    io.to(roomId).emit("list:deleted", data);
  });

  socket.on("list:rename", async (data) => {
    console.log("rename list - ", data);

    await renameList(data._id, data.newName);

    io.to(roomId).emit("list:renamed", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected -  ", socket.id);
    socket.disconnect();
  });
};
