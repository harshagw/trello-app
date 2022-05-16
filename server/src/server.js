const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const path = require("path");

dotenv.config()

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      });
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      process.exit();
    }
};

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

const server = app.listen( PORT, () => {
    console.log(`Server running on PORT ${PORT}...`)
});

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
});



  
