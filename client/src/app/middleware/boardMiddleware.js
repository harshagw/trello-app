import { createListenerMiddleware } from "@reduxjs/toolkit";
import io from "socket.io-client";
import {
  addList,
  setError,
  boardEmit,
  deleteList,
  initializeBoard,
  renameList,
  reorderList,
  resetBoard,
  setBoard,
  updateBoard,
  addCard,
  deleteCard,
  updateCard,
  reorderCards,
} from "../features/boardSlice";

import { updateBoard as updateGlobalBoard } from "../features/userSlice";

let socket;

const boardMiddleware = createListenerMiddleware();

boardMiddleware.startListening({
  actionCreator: initializeBoard,
  effect: async (action, listenerApi) => {
    const boardId = action.payload;

    const { auth } = listenerApi.getState();

    console.log("connecting to the board socket of - ", boardId);

    socket = io.connect("http://localhost:3001/board", {
      extraHeaders: { Authorization: `Bearer ${auth?.data?.accessToken}` },
      query: { boardId: boardId },
      reconnection: false,
    });

    socket.on("connect_error", (err) => {
      console.log("The server sent the connect_error - ", err.message);
      listenerApi.dispatch(setError());
    });

    socket.on("connect", () => {
      console.log("connection established - ", socket.id);
    });

    socket.on("board:get", (data) => {
      listenerApi.dispatch(setBoard(data));
    });

    socket.on("board:updated", (data) => {
      listenerApi.dispatch(updateBoard(data));
      listenerApi.dispatch(updateGlobalBoard(data));
    });

    socket.on("board:deleted", (data) => {
      listenerApi.dispatch(resetBoard());
      listenerApi.dispatch(setError());
    });

    socket.on("list:added", (data) => {
      listenerApi.dispatch(addList(data));
    });

    socket.on("list:renamed", (data) => {
      listenerApi.dispatch(renameList(data));
    });

    socket.on("list:deleted", (data) => {
      listenerApi.dispatch(deleteList(data));
    });

    socket.on("list:reordered", (data) => {
      console.log("list reordering");
      console.log(data);
      listenerApi.dispatch(reorderList(data));
    });

    socket.on("card:added", (data) => {
      listenerApi.dispatch(addCard(data));
    });

    socket.on("card:updated", (data) => {
      listenerApi.dispatch(updateCard(data));
    });

    socket.on("card:deleted", (data) => {
      listenerApi.dispatch(deleteCard(data));
    });

    socket.on("card:reordered", (data) => {
      console.log("card reordering");
      console.log(data);
      listenerApi.dispatch(reorderCards(data));
    });
  },
});

boardMiddleware.startListening({
  actionCreator: boardEmit,
  effect: async (action, listenerApi) => {
    console.log("calling ", action);
    socket.emit(action.payload.name, action.payload.data);
  },
});

boardMiddleware.startListening({
  actionCreator: resetBoard,
  effect: async (action, listenerApi) => {
    console.log("disconnecting from ", socket.id);
    socket?.disconnect();
  },
});

export default boardMiddleware;
