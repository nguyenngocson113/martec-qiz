import { createSlice } from "@reduxjs/toolkit";
import { omitBy } from "lodash";

export interface NotificationI {
  type: string;
  title?: string;
  content?: string;
  id: string;
}

const notificationSlice = createSlice({
  name: "notification",
  initialState: [] as NotificationI[],
  reducers: {
    add(state, action) {
      state.push({
        type: action.payload.type,
        title: action.payload.title,
        content: action.payload.content,
        id: `${new Date().getTime}`,
      });
    },
    remove(state, action) {
      const id = action.payload.id;
      omitBy(state, (notification) => notification.id === id);
    },
  },
});

export default notificationSlice;
