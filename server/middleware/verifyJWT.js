const jwt = require("jsonwebtoken");

module.exports.socket = (socket, next) => {
  console.log("running the middleware");
  const header = socket.handshake.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    next(new Error("token not provided"));
    return;
  }

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      next(new Error("invalid token"));
      return;
    }

    socket.user = decoded;
    next();
  });
};

module.exports.express = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded;
    next();
  });
};
