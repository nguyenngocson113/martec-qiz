import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRepos = createAsyncThunk(
  "repos/getRepos",
  async (username: string) => {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    return {
      repos: response.data,
      isSuccess: true,
    };
  }
);

export interface RepoI {
  full_name: string;
}
export interface ReposI {
  repos: RepoI[];
  isSuccess: null | boolean;
  isLoading: boolean;
}
const initialState: ReposI = {
  repos: [],
  isSuccess: null,
  isLoading: false,
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRepos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRepos.fulfilled, (state, action) => {
      const { repos, isSuccess } = action.payload;
      state.repos = repos;
      state.isSuccess = isSuccess;
      state.isLoading = false;
    });
    builder.addCase(getRepos.rejected, (state) => {
      state.isSuccess = false;
      state.isLoading = false;
    });
  },
});

export default reposSlice;
