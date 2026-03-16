import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export const PrivateRoute = ({ children }) => {

  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return isSignedIn ? children : <Navigate to="/user/login" />;
};