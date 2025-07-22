import React, { useState } from "react";
import { signup } from "../../api/authAPI";

export default function Signup({ onSignupSuccess, setSignupError}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_to_confirm: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      onSignupSuccess(); // Switch to login page
    } catch (err) {
      // Extract error from API response
      if (err.response && err.response.data) {
        const data = err.response.data;
        const firstError =
          typeof data === "string"
            ? data
            : Object.values(data).flat().join(" ");
        setSignupError(firstError);
      } else {
        setSignupError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="password" name="password_to_confirm" placeholder="Confirm Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
