import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteI {
  component: any;
  path: string;
}

const PublicRoute: FC<PublicRouteI> = ({ component: Component, path }) => {
  const { isSuccess } = useSelector((state: DefaultRootState) => state.user);
  if (isSuccess) return <Navigate to={path} />;
  return <Component />;
};

export default PublicRoute;
