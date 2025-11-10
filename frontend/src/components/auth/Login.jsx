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
        //console.log('Login Res', res);
        localStorage.setItem("access_token", res.access);
        localStorage.setItem("refresh_token", res.refresh);
        localStorage.setItem("username", credentials.username);
        //--- This needs to be replaced as the real logic to tell the user status ---//
        if(credentials.username.startsWith('testnew'))
        {
          localStorage.setItem("is_regular", false);
        }
        else
        { 
          localStorage.setItem("is_regular", true);
          if(credentials.username.startsWith('agafil'))
          {
            localStorage.setItem("is_super", true);
          }
          else
          { 
            localStorage.setItem("is_super", false);
          }
        }
        try
        {
          onLogin();
        }
        catch
        {
          //--- Do Nothing ---//
        } 
        window.location.href = "/home";
      } else {
        alert('Login Failed')
        console.error("Login failed: The server didn't return valid access info.");
      }
    } catch (error) {
      alert('Login Error')
      console.error("Login error:", error);
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
