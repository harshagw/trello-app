const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.getFavourites = async (userId) => {
  const user = await User.findOne({ _id: userId });

  if (user["favourites"]) return user["favourites"];
  else return [];
};

module.exports.addFavourite = async (userId, boardId) => {
  console.log("adding favourite - ", boardId);
  await User.findByIdAndUpdate(userId, { $push: { favourites: boardId } });
};

module.exports.removeFavourite = async (userId, boardId) => {
  console.log("removing favourite - ", boardId);
  await User.findByIdAndUpdate(userId, { $pull: { favourites: boardId } });
};
