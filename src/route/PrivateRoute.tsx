import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
