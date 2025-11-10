import React from "react";
import { logout } from "../../api/authAPI";

export default function Logout({ onLogout }) {
  const handleServerLogout = async () => {
    alert(123)
    const refreshToken = localStorage.getItem("refresh_token");
    await logout(refreshToken);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("is_regular");  
    // Redirect to login or homepage
    onLogout();
    window.location.href = "/home";
  };
  return <button onClick={handleServerLogout}>Logout</button>;
}