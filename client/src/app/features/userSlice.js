import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  boards: [],
  favourites: [],
  shared: [],
  invitations: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    initializeUser: (state, action) => {},
    setUser: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.boards = action.payload.boards;
      state.invitations = action.payload.invitations;
      state.favourites = action.payload.favourites;
    },
    resetUser: (state, action) => {
      state = { userId: [], loading: true, allboards: [], boards: [], favourites: [], shared: [], invitations: [] };
    },
    userEmit: (state, action) => {},

    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter((f) => f != action.payload);
    },

    addBoard: (state, action) => {
      state.boards.push(action.payload);
    },

    updateBoard: (state, action) => {
      console.log("runnign update board from user slice");
      console.log(action.payload);
      state.boards = state.boards.map((board) => {
        if (action.payload._id == board._id) {
          return action.payload;
        } else {
          return board;
        }
      });
    },

    deleteBoard: (state, action) => {
      console.log("runnign update board from user slice");
      console.log(action.payload);
      state.boards = state.boards.filter((board) => {
        if (action.payload._id == board._id) {
          return false;
        } else {
          return true;
        }
      });
    },

    addInvite: (state, action) => {
      state.invitations.push(action.payload);
    },

    acceptInvite: (state, action) => {},

    declineInvite: (state, action) => {
      console.log(action.payload);
      state.invitations = state.invitations.filter((f) => f._id != action.payload);
    },
  },
});

export const {
  initializeUser,
  userEmit,
  addBoard,
  deleteBoard,
  updateBoard,
  resetUser,
  setUser,
  addFavourite,
  removeFavourite,
  addInvite,
  acceptInvite,
  declineInvite,
} = userSlice.actions;

export default userSlice.reducer;
