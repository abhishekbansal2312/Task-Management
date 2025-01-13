import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode

const ProtectedRouteAdminOnly = ({ children }) => {
  // Check if the token exists in the cookies
  const token = Cookies.get("token");
  const isAuthenticated = Boolean(token);
  
  if (!isAuthenticated) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  } else {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    if (decodedToken.role === "member") {
      // If the user is not an admin, redirect to the dashboard page
      return <Navigate to="/dashboard" replace />;
    }
    // If authenticated and the role is admin or manager, render the children components (e.g., Users page)
    return children;
  }
};

export default ProtectedRouteAdminOnly;
