import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { boardsSlice } from "./boardsSlice";
import axios from "./../axios";

const data = JSON.parse(localStorage.getItem("authData"));

const initialState = {
  data: data ? data : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("auth/register", user);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("auth/login", user);

    if (response.data) {
      localStorage.setItem("authData", JSON.stringify(response.data.data));
    }

    console.log("resetting all the data");
    await thunkAPI.dispatch(boardsSlice.util.resetApiState());

    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    const response = await axios.get("auth/logout");

    localStorage.removeItem("authData");

    return response.data;
  }
);

// export const refresh = createAsyncThunk(
//   "auth/refresh",
//   async (data, thunkAPI) => {
//     try {
//       const response = await axios.get("auth/refresh");
//      return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    changeAccessToken: (state, action) => {
      state.data.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Registration is successfull.");
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.data = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.data = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        toast.success("You have logout successfully.");
      });
    // .addCase(refresh.fulfilled, (state, action) => {
    //   state.data = { ...state.data, accessToken: action.payload.data };
    // })
    // .addCase(refresh.rejected, (state, action) => {
    //   state.data = null;
    //   toast.error("Session expired. Please login again.");
    // });
  },
});

export const { reset, changeAccessToken } = authSlice.actions;
export default authSlice.reducer;
