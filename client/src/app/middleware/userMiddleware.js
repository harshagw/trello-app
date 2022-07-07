import { createListenerMiddleware } from "@reduxjs/toolkit";
import io from "socket.io-client";
import {
  initializeUser,
  userEmit,
  resetUser,
  setUser,
  addFavourite,
  deleteBoard,
  removeFavourite,
  addBoard,
  updateBoard,
  addInvite,
  declineInvite,
} from "../features/userSlice";

let userSocket;

const userMiddleware = createListenerMiddleware();

userMiddleware.startListening({
  actionCreator: initializeUser,
  effect: async (action, listenerApi) => {
    const { auth } = listenerApi.getState();

    userSocket = io.connect("http://localhost:3001/user", {
      extraHeaders: { Authorization: `Bearer ${auth?.data?.accessToken}` },
      reconnection: false,
    });

    userSocket.on("connect_error", (err) => {
      console.log("The server sent the connect_error - ", err.message);
    });

    userSocket.on("connect", () => {
      console.log("connection established - ", userSocket.id);
    });

    userSocket.on("user:get", (data) => {
      listenerApi.dispatch(setUser(data));
    });

    userSocket.on("user:newBoard", (data) => {
      listenerApi.dispatch(addBoard(data));
    });

    userSocket.on("user:updateBoard", (data) => {
      listenerApi.dispatch(updateBoard(data));
    });

    userSocket.on("user:deleteBoard", (data) => {
      listenerApi.dispatch(deleteBoard(data));
    });

    userSocket.on("user:recieveInvite", (data) => {
      listenerApi.dispatch(addInvite(data));
    });
  },
});

userMiddleware.startListening({
  actionCreator: userEmit,
  effect: async (action, listenerApi) => {
    console.log("calling ", action);
    userSocket.emit(action.payload.name, action.payload.data);
  },
});

userMiddleware.startListening({
  actionCreator: addFavourite,
  effect: async (action, listenerApi) => {
    console.log("calling ", action);
    userSocket.emit("user:addFavourite", action.payload);
  },
});

userMiddleware.startListening({
  actionCreator: removeFavourite,
  effect: async (action, listenerApi) => {
    console.log("calling ", action);
    userSocket.emit("user:removeFavourite", action.payload);
  },
});

userMiddleware.startListening({
  actionCreator: resetUser,
  effect: async (action, listenerApi) => {
    console.log("disconnecting from ", userSocket.id);
    userSocket?.disconnect();
  },
});

export default userMiddleware;
