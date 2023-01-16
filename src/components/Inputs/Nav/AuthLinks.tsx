import { FC } from "react";
import { Link } from "react-router-dom";
import { UserStateI } from "../../../store/reducers/user";

interface AuthLinksI {
  auth: UserStateI;
  logout: () => void;
}
const AuthLinks: FC<AuthLinksI> = ({ auth, logout }) => {
  return (
    <>
      {auth && auth.isSuccess ? (
        <div className="hidden md:block text-white">
          <div className="flex items-center">
            <Link
              onClick={() => logout()}
              to="/login"
              className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </Link>
            <div className="px-2 py-1 border text-sm">
              Welcome, {auth.user.email || auth.user.lastName}
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:block text-white">
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLinks;
