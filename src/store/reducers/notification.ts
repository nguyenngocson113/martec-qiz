import { createSlice } from "@reduxjs/toolkit";
import { filter } from "lodash";

export interface NotificationI {
  type: string;
  title?: string;
  content?: string;
  id: string;
}

export interface NotificationsState {
  notifications: NotificationI[];
}
const initialState: NotificationsState = {
  notifications: [],
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    add(state, action) {
      state.notifications.push({
        type: action.payload.type,
        title: action.payload.title,
        content: action.payload.content,
        id: `${new Date().getTime()}`,
      });
    },
    remove(state, action) {
      const { notifications } = state;
      const id = action.payload.id;
      state.notifications = filter(
        notifications,
        (notification) => notification.id !== id
      );
    },
  },
});

export default notificationSlice;
