import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { boardsApi, pokemonApi } from "../features/boards/boardSlice";
import { boardSlice } from "../features/boards/boardSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // [boardsApi.reducerPath]: boardsApi.reducer,
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
    [boardSlice.reducerPath]: boardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(boardSlice.middleware),
});
