import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import { boardsSlice } from "./features/boardsSlice";
import userSlice from "./features/userSlice";
import boardSlice from "./features/boardSlice";
import boardMiddleware from "./middleware/boardMiddleware";
import userMiddleware from "./middleware/userMiddleware";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // [boardsSlice.reducerPath]: boardsSlice.reducer,
    user: userSlice,
    board: boardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(boardMiddleware.middleware, userMiddleware.middleware),
  // boardsSlice.middleware
});
