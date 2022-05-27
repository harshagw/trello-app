const User = require("../models/User");

const getUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findOne({
      _id: userId,
    });

    res.status(200).json({ data: user, message: "user found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.user._id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }

  try {
    const user = await User.findOne({
      _id: userId,
    });

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).json({ data: user, message: "user has been updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findOneAndDelete({
      _id: userId,
    });

    res.status(200).json({ message: "User has been deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, updateUser, deleteUser };
