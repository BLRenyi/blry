import React, { useState } from "react";
import { login } from "../../api/authAPI";

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(credentials);
      if (res.access) {
        localStorage.setItem("access_token", res.access);
        localStorage.setItem("refresh_token", res.refresh);
        onLogin();
      } else {
        console.error("Login failed: The server didn't return valid access info.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: Invalid username or password.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Log In</button>
    </form>
  );
}
