import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import { boardsSlice } from "./features/boardsSlice";
import boardSlice from "./features/boardSlice";
import boardMiddleware from "./middleware/boardMiddleware";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [boardsSlice.reducerPath]: boardsSlice.reducer,
    board: boardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(
      boardsSlice.middleware,
      boardMiddleware.middleware
    ),
});
