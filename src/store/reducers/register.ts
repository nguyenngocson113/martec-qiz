import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { find } from "lodash";
import { batch } from "react-redux";
import { notification } from ".";
import { loginUser, UserI } from "./user";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user: UserI, thunkAPI) => {
    const users = localStorage.getItem("users") || "[]";
    try {
      const usersArr: UserI[] = JSON.parse(users);
      const { phone, email } = user;
      const existUser = find(usersArr, (userExist) => {
        const { phone: phoneRegisted, email: emailRegisted } = userExist;
        return phone === phoneRegisted && email === emailRegisted;
      });

      if (existUser) {
        thunkAPI.dispatch(
          notification.actions.add({
            type: "error",
            title: "Error",
            content: "Registration failed",
          })
        );
        return { users: usersArr, isSuccess: false };
      }

      usersArr.push(user);
      localStorage.setItem("users", JSON.stringify(usersArr));
      batch(() => {
        thunkAPI.dispatch(
          notification.actions.add({
            type: "success",
            title: "Success",
            content: "Registration successed",
          })
        );
        thunkAPI.dispatch(loginUser(user));
      });

      return {
        users: usersArr,
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        users: [],
      };
    }
  }
);

export interface RegisterI {
  users: UserI[];
  isSuccess: null | boolean;
  isLoading: boolean;
}
const initialState: RegisterI = {
  users: [],
  isSuccess: null,
  isLoading: false,
};

const registerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { users, isSuccess } = action.payload;
      state.users = users;
      state.isSuccess = isSuccess;
      state.isLoading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isSuccess = false;
      state.isLoading = false;
    });
  },
});

export default registerSlice;
