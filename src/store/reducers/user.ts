import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { find } from "lodash";
import { notification } from ".";

export const loginUser = createAsyncThunk(
  "users/login",
  async (user: UserI, thunkAPI) => {
    const users = localStorage.getItem("users") || "[]";
    try {
      const usersArr: UserI[] = JSON.parse(users);
      const { phone, email, password } = user;
      const existUser = find(usersArr, (userExist) => {
        const {
          phone: phoneRegisted,
          email: emailRegisted,
          password: passwordRegisted,
        } = userExist;
        return (
          (phone === phoneRegisted || email === emailRegisted) &&
          password === passwordRegisted
        );
      });

      if (!existUser) {
        thunkAPI.dispatch(
          notification.actions.add({
            type: "error",
            title: "Error",
            content: "User login failed",
          })
        );
        return { user: {}, isSuccess: false };
      }

      localStorage.setItem("user", JSON.stringify(existUser));
      thunkAPI.dispatch(
        notification.actions.add({
          type: "success",
          title: "Success",
          content: "User login success",
        })
      );
      return {
        user: existUser,
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        user: {},
      };
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (user: UserI, thunkAPI) => {
    const users = localStorage.getItem("users") || "[]";
    try {
      const usersArr: UserI[] = JSON.parse(users);
      const { phone, email, password } = user;
      const existUser = find(usersArr, (userExist) => {
        const {
          phone: phoneRegisted,
          email: emailRegisted,
          password: passwordRegisted,
        } = userExist;
        return (
          (phone === phoneRegisted || email === emailRegisted) &&
          password === passwordRegisted
        );
      });
      if (!existUser) {
        thunkAPI.dispatch(
          notification.actions.add({
            type: "error",
            title: "Error",
            content: "Update failed",
          })
        );
        return { user: {}, isSuccess: false };
      }
      Object.assign(existUser, user);
      localStorage.setItem("user", JSON.stringify(existUser));
      thunkAPI.dispatch(
        notification.actions.add({
          type: "success",
          title: "Success",
          content: "Update success",
        })
      );
      return {
        user: existUser,
        isSuccess: true,
      };
    } catch (error) {
      return {
        isSuccess: false,
        user: {},
      };
    }
  }
);

export interface UserI {
  email?: string;
  phone?: string;
  lastName?: string;
  firstName?: string;
  password?: string;
}
export interface UserStateI {
  user: UserI;
  isSuccess: null | boolean;
  isLoading: boolean;
}
const initialState: UserStateI = {
  user: {} as UserI,
  isSuccess: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("user");
      state.isSuccess = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const { user, isSuccess } = action.payload;
      state.user = user;
      state.isSuccess = isSuccess;
      state.isLoading = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isSuccess = false;
      state.isLoading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user, isSuccess } = action.payload;
      state.user = user;
      state.isSuccess = isSuccess;
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.isSuccess = false;
      state.isLoading = false;
    });
  },
});

export default userSlice;
