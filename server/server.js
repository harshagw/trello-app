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

app.use(verifyJWT);
app.use("/users", require("./routes/users"));
app.use("/boards", require("./routes/boards"));
app.use("/lists", require("./routes/lists"));
app.use("/cards", require("./routes/cards"));

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

  const jwt = require("jsonwebtoken");
  const Board = require("./models/Board");

  const boardNamespace = io.of("/board");

  boardNamespace.use((socket, next) => {
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
  });

  boardNamespace.use(async (socket, next) => {
    console.log("checking the board validity");
    const boardId = socket.handshake.query.boardId;
    const userId = socket.user._id;

    if (!boardId?.match(/^[0-9a-fA-F]{24}$/)) {
      next(new Error("invalid board id"));
      return;
    }

    const board = await Board.findOne({
      _id: boardId,
      adminId: userId,
    });

    if (board) {
      socket.board = boardId;
      next();
    } else {
      next(new Error("board doens't exist."));
      return;
    }
  });

  boardNamespace.on("connection", async (socket) => {
    console.log("new connection - ", socket.id);

    const userId = socket.user._id;

    console.log(socket.handshake.query.boardId);

    const boardId = socket.handshake.query.boardId;

    // console.log(userId, boardId);
    socket.join(`board-${boardId}`);

    if (!userId || !boardId) {
      socket.disconnect();
    }
    // socket.on("subscribe-board", async ({ boardId }) => {});

    socket.on("list:create", async (data) => {
      console.log("new list created");
      socket.to(`board-${boardId}`).emit("list:created");
    });

    // socket.on("list:edit");
    // socket.on("list:delete");
    // socket.on("list:update");
    // socket.on("list:move");

    // socket.on("card:create");
    // socket.on("card:edit");
    // socket.on("card:delete");
    // socket.on("card:update");
    // socket.on("card:move");

    socket.on("disconnect", () => {
      console.log("disconnected -  ", socket.id);
      socket.disconnect();
    });
  });
});
