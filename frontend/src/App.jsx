import React, { useState, useEffect } from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupError, setSignupError] = useState("");

  // On mount, check if access token exists
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome BLRY!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : showSignup ? (
        <>
          <Signup
            onSignupSuccess={() => {
              setSignupError(""); // Clear error on success
              setShowSignup(false); // Go back to login
            }}
            setSignupError={setSignupError} // Pass down
          />
          {signupError && <p style={{ color: "red" }}>{signupError}</p>}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}

      {!isLoggedIn && (
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? "Go to Login" : "Go to Signup"}
        </button>
      )}
    </div>
  );
}
