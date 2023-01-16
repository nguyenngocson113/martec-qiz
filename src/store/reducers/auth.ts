import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (obj, { dispatch }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("token", response.data.data.jwt);

    return response.data.data;
  }
);

export interface AuthI {
  user: string;
  status: null | string;
  isLoggedIn: boolean;
}
const initialState: AuthI = {
  user: "",
  status: null,
  isLoggedIn: false,
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refresh(state, action) {
      state.isLoggedIn = true;
    },
    logout(state, action) {
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "success";
      }),
      builder.addCase(getUser.rejected, (state) => {
        localStorage.removeItem("token");
        state.isLoggedIn = false;
        state.status = "failed";
      });
  },
});

export default authSlice;
