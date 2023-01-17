import React, { FC } from "react";
import { Navigate } from "react-router-dom";

// hooks
import { useSelector } from "react-redux";

interface PrivateRouteI {
  component: React.ElementType;
  path: string;
}
const PrivateRoute: FC<PrivateRouteI> = ({ component: Component, path }) => {
  const { isSuccess } = useSelector((state: DefaultRootState) => state.user);
  if (!isSuccess) return <Navigate to={path} replace={true} />;

  return <Component />;
};

export default PrivateRoute;
