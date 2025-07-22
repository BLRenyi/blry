import React from "react";
import { logout } from "../../api/authAPI";

const Logout = () => {
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    await logout(refreshToken);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Redirect to login or homepage
    window.location.href = "/accounts/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
