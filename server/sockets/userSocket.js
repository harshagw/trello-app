const { isValidObjectId } = require("mongoose");
const { getAllBoard, addBoard, getBoard, addMemberToBoard } = require("../services/boardService");
const { getUserInvitation, addInvite, deleteInvite, getInvite } = require("../services/invitationService");
const { getFavourites, addFavourite, removeFavourite } = require("../services/userService");

module.exports.handler = async (io, socket) => {
  console.log("new connection of the user - ", socket.id);
  const userId = socket.user._id;
  socket.join(userId);

  const boards = await getAllBoard(userId);
  const favourites = await getFavourites(userId);
  const invites = await getUserInvitation(userId);

  data = {};
  data["boards"] = boards;
  data["invitations"] = invites;
  data["favourites"] = favourites;

  socket.emit("user:get", data);

  socket.on("user:addFavourite", async (data) => {
    await addFavourite(userId, data);
  });

  socket.on("user:removeFavourite", async (data) => {
    await removeFavourite(userId, data);
  });

  socket.on("user:addBoard", async (data) => {
    const board = await addBoard(userId, data.title);

    io.to(userId).emit("user:newBoard", board);
  });

  socket.on("user:addInvite", async (data) => {
    const invite = await addInvite(data.boardId, data.from, data.to);

    console.log(invite);

    if (invite) {
      console.log(invite["to"]);
      io.to(invite.to.toString()).emit("user:recieveInvite", invite);
    }
  });

  socket.on("user:declineInvite", async (data) => {
    await deleteInvite(data);
  });

  socket.on("user:acceptInvite", async (data) => {
    const invite = await getInvite(data);

    await deleteInvite(data);

    await addMemberToBoard(invite.board._id.toString(), invite.to.toString());

    const board = await getBoard(invite.board._id.toString(), invite.to.toString());

    io.to(invite.to.toString()).emit("user:newBoard", board);
  });

  socket.on("disconnect", () => {
    console.log("disconnected the main user socket -  ", socket.id);
    socket.disconnect();
  });
};
