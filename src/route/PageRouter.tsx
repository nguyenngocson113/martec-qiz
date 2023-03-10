import Notification from "components/Notification";
import Login from "pages/Login";
import Register from "pages/Register";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const PageRouter = () => {
  return (
    <>
      <Notification />
      <Routes>
        <Route
          path="/login"
          element={<PublicRoute component={Login} path="/" />}
        />
        <Route
          path="/register"
          element={<PublicRoute path="/" component={Register} />}
        />
        <Route
          path="/"
          element={<PrivateRoute component={Dashboard} path="/login" />}
        />
      </Routes>
    </>
  );
};

export default PageRouter;
