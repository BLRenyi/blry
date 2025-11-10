import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Registration from './reg/Registration';
import ViewStep from './reg/ViewStep';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupError, setSignupError] = useState('');

  // On mount, check if access token exists
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (isRegular) => {
    setIsLoggedIn(true);
    setIsRegular(isRegular);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };
const continueRegistration = () => {
    window.location.href = "/register";
  };
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />}>
          <Route path="step" element={<ViewStep />} />
          <Route path="bike" element={<BikeProducts />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <div>
      {isLoggedIn ? (
        isRegular ? (
          <div>
            <h2>Welcome BLRY!</h2>
            <button >Go to Content</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h2>Welcome BLRY!</h2>
            <button onClick={continueRegistration}>Continue Registration</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )
      ) : showSignup ? (
        <>
          <Signup
            onSignupSuccess={() => {
              setSignupError(''); // Clear error on success
              setShowSignup(false); // Go back to login
            }}
            setSignupError={setSignupError} // Pass down
          />
          {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}

      {!isLoggedIn && (
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? 'Go to Login' : 'Go to Signup'}
        </button>
      )}
    </div>
    </BrowserRouter>
  





    
  );
}
