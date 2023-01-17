import { ElementType, FC } from "react";
import { Navigate } from "react-router-dom";

// hooks
import { useSelector } from "react-redux";

interface PublicRouteI {
  component: ElementType;
  path: string;
}

const PublicRoute: FC<PublicRouteI> = ({ component: Component, path }) => {
  const { isSuccess } = useSelector((state: DefaultRootState) => state.user);
  if (isSuccess) return <Navigate to={path} />;
  return <Component />;
};

export default PublicRoute;
