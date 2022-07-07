const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require("http");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/connectDB");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");

const app = express();

connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/auth", require("./routes/auth"));

app.use(verifyJWT.express);
app.use("/users", require("./routes/users"));
app.use("/boards", require("./routes/boards"));
// app.use("/lists", require("./routes/lists"));
// app.use("/cards", require("./routes/cards"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  const PORT = process.env.PORT || 3000;

  const httpServer = createServer(app);

  const io = require("socket.io")(httpServer, {
    pingTimeout: 60000,
    cors: corsOptions,
  });

  httpServer.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}...`);
  });

  const boardSocket = require("./sockets/boardSocket");
  const boardNamespace = io.of("/board");

  const userSocket = require("./sockets/userSocket");
  const userNamespace = io.of("/user");

  boardNamespace.use(verifyJWT.socket);
  boardNamespace.use(boardSocket.verifyBoard);
  boardNamespace.on("connection", (socket) => {
    boardSocket.handler(boardNamespace, userNamespace, socket);
  });

  userNamespace.use(verifyJWT.socket);
  userNamespace.on("connection", (socket) => {
    userSocket.handler(userNamespace, socket);
  });
});
