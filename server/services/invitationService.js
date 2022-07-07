const Invite = require("../models/Invite");
const Board = require("../models/Board");
const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const ObjectId = mongoose.Types.ObjectId;

module.exports.getUserInvitation = async (userId) => {
  const invites = await Invite.find({ to: userId }).populate("board", ["name"]);

  return invites;
};

module.exports.getInvite = async (inviteId) => {
  const invite = await Invite.findById(inviteId).populate("board", ["name"]);

  return invite;
};

module.exports.deleteInvite = async (inviteId) => {
  await Invite.findByIdAndDelete(inviteId);
};

module.exports.addInvite = async (boardId, from, toEmail) => {
  const toUser = await User.findOne({ email: toEmail });

  if (toUser) {
    let invite = await Invite.findOne({ board: boardId, from: from, to: toUser._id });

    let board = await Board.findOne({ _id: boardId, members: toUser._id });

    if (invite || board) return;

    invite = new Invite({
      board: boardId,
      from: from,
      to: toUser._id,
    });

    await invite.save();

    invite = await this.getInvite(invite["_id"]);

    return invite;
  }

  return;
};
