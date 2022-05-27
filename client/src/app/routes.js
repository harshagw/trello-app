import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// only when user is logged in
export const PrivateRoute = ({ children }) => {
  const { data } = useSelector((state) => state.auth);
  const location = useLocation();

  return data?.accessToken ? (
    [children]
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

// only when user is not logged in
export const PublicRoute = ({ children }) => {
  const { data } = useSelector((state) => state.auth);
  const location = useLocation();

  return !data?.accessToken ? (
    [children]
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};
