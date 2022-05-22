const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401);

  if (foundUser.comparePassword(password)) {
    const accessToken = foundUser.generateAccessToken();
    const refreshToken = foundUser.generateRefreshToken();

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ user: foundUser, accessToken: accessToken });
  } else {
    res.sendStatus(401);
  }
};

const handleRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, Email and password are required." });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    //create and store the new user
    const newUser = await new User({
      name: name,
      email: email,
      password: password,
    });

    await newUser.save();

    res
      .status(201)
      .json({ user: newUser, success: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(req.cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    const accessToken = foundUser.generateAccessToken();
    res.json({ accessToken: accessToken });
  });
};

module.exports = {
  handleLogin,
  handleRegistration,
  handleLogout,
  handleRefreshToken,
};
