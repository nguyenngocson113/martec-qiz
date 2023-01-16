import { configureStore } from "@reduxjs/toolkit";
import { auth, register, notification, user, repos } from "./reducers";
import { AuthI } from "./reducers/auth";
import { ReposI } from "./reducers/github-repo";
import { NotificationI } from "./reducers/notification";
import { RegisterI } from "./reducers/register";
import { UserStateI } from "./reducers/user";

const store = configureStore({
  reducer: {
    register: register.reducer,
    auth: auth.reducer,
    notification: notification.reducer,
    user: user.reducer,
    repos: repos.reducer,
  },
});

export type RootState = {
  auth: AuthI;
  register: RegisterI;
  notification: NotificationI[];
  user: UserStateI;
  repos: ReposI;
};
export type AppDispatch = typeof store.dispatch;

export default store;
