import { configureStore } from "@reduxjs/toolkit";
import { notification, register, repos, user } from "./reducers";
import { ReposI } from "./reducers/github-repo";
import { NotificationsState } from "./reducers/notification";
import { RegisterI } from "./reducers/register";
import { UserStateI } from "./reducers/user";

const store = configureStore({
  reducer: {
    register: register.reducer,
    notification: notification.reducer,
    user: user.reducer,
    repos: repos.reducer,
  },
});

export type RootState = {
  register: RegisterI;
  notification: NotificationsState;
  user: UserStateI;
  repos: ReposI;
};
export type AppDispatch = typeof store.dispatch;

export default store;
