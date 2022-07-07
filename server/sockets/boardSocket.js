const { isValidObjectId } = require("mongoose");

const { getBoard, updateBoard, deleteBoard } = require("../services/boardService");

const { getAllList, addList, getList, deleteList, renameList, reorderList } = require("../services/listService");

const { getCard, addCard, updateCard, deleteCard, reorderCard } = require("../services/cardService");

module.exports.verifyBoard = async (socket, next) => {
  console.log("checking the board validity");
  console.log(socket.handshake.query);

  const boardId = socket.handshake.query.boardId;
  const userId = socket.user._id;

  if (!isValidObjectId(boardId) || !isValidObjectId(userId)) {
    console.log(boardId, userId);
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

module.exports.handler = async (io, userio, socket) => {
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

  socket.on("board:update", async (data) => {
    console.log("edit board - ", data);

    const b = await updateBoard(boardId, data);
    const board = await getBoard(boardId, userId);

    console.log("printing members");
    for (let member of board.members) {
      console.log(member._id);
      userio.to(member._id.toString()).emit("user:updateBoard", board);
    }

    io.to(roomId).emit("board:updated", board);
  });

  socket.on("board:delete", async (data) => {
    console.log("delele board - ", boardId);

    const board = await getBoard(boardId, userId);

    console.log("printing members");
    for (let member of board.members) {
      console.log(member._id);
      userio.to(member._id.toString()).emit("user:deleteBoard", board);
    }

    await deleteBoard(boardId);

    io.to(roomId).emit("board:deleted");
  });

  socket.on("list:add", async (data) => {
    console.log("add list - ", data);

    const l = await addList(boardId, data.name);
    const list = await getList(l["_id"]);

    console.log(list);

    io.to(roomId).emit("list:added", list);
  });

  socket.on("list:delete", async (data) => {
    console.log("delete list - ", data);

    await deleteList(data._id);

    io.to(roomId).emit("list:deleted", data);

    const lists = await getAllList(boardId);

    io.to(roomId).emit("list:reordered", lists);
  });

  socket.on("list:rename", async (data) => {
    console.log("rename list - ", data);

    await renameList(data._id, data.newName);

    io.to(roomId).emit("list:renamed", data);
  });

  socket.on("list:reorder", async (data) => {
    console.log("list reorder - ", data);

    await reorderList(data);

    const lists = await getAllList(boardId);

    io.to(roomId).emit("list:reordered", lists);
  });

  socket.on("card:add", async (data) => {
    console.log("add card - ", data);

    const c = await addCard(data.listId, data.title);

    console.log(c);

    const card = await getCard(c["_id"]);

    io.to(roomId).emit("card:added", card);
  });

  socket.on("card:update", async (data) => {
    console.log("edit card - ", data);

    const c = await updateCard(data.listId, data.cardId, data.updates);

    console.log("card details from the c function == ");
    console.log(c);

    const card = await getCard(data.cardId);
    console.log("card detaisl from get function == ");
    console.log(card);

    io.to(roomId).emit("card:updated", card);
  });

  socket.on("card:delete", async (data) => {
    console.log("delete card - ", data);

    const c = await deleteCard(data._id);

    io.to(roomId).emit("card:deleted", c);

    let newOrderCards = await getList(c.listId);

    console.log("from newordercards fucntion-");
    console.log(newOrderCards);

    io.to(roomId).emit("card:reordered", newOrderCards);
  });

  socket.on("card:reorder", async (data) => {
    console.log("reorder card - ", data);

    await reorderCard(data);

    let newOrderCards = await getList(data.destinationListId);

    console.log("from newordercards fucntion-");
    console.log(newOrderCards);

    io.to(roomId).emit("card:reordered", newOrderCards);

    if (data.destinationListId != data.sourceListId) {
      newOrderCards = await getList(data.sourceListId);

      console.log("from newordercards fucntion-");
      console.log(newOrderCards);

      io.to(roomId).emit("card:reordered", newOrderCards);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected -  ", socket.id);
    socket.disconnect();
  });
};
