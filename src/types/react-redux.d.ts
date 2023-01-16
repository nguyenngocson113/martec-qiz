import "react-redux";

import { RootState, AppDispatch as Dispatch } from "../store";

// declare module "react-redux" {
//   interface DefaultRootState extends RootState {}
// }

declare global {
  type DefaultRootState = RootState;
  type AppDispatch = Dispatch;
}
