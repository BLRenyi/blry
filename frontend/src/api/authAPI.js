// These APIs are for Token-based Authenication
//
// See https://www.okta.com/identity-101/what-is-token-based-authentication/
// for more details about Token-based Authenication.

import axios from 'axios';

const AUTH_BASE_URL = "http://localhost:8000/api/accounts";

/**
 * Sends a signup request to the backend with user data.
 * On success, returns the response data.
 * Throws an error if signup fails.
 */
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/signup/`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Sends a login request with user credentials.
 * On success, stores access and refresh tokens in localStorage,
 * sets the default Authorization header, and returns the response data.
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login/`, credentials);
    const { access, refresh } = response.data;

    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Logs out the user by removing tokens from localStorage
 * and deleting the Authorization header.
 */
export const logout = () => {
  delete axios.defaults.headers.common["Authorization"];

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

/**
 * Sends a request to refresh the access token using the stored refresh token.
 * On success, updates the stored access token and the Authorization header.
 * On failure, logs the user out and throws the error.
 */
export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found.");

  try {
    const response = await axios.post(`${AUTH_BASE_URL}/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh error:", error.response?.data || error.message);
    logout();
    throw error;
  }
};
