import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [isSuper, setIsSuper] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupError, setSignupError] = useState('');

  // On mount, check if access token exists
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const is_regular = localStorage.getItem('is_regular');
    const is_super = localStorage.getItem('is_super');
    if (access_token) {
      setIsLoggedIn(true);
    }
    if (is_regular == 'true') {
      setIsRegular(true);
    }
    if (is_super == 'true') {
      setIsSuper(true);
    }
  }, []);

  const handleLogin = () => {
    //setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    //localStorage.removeItem("access_token");
    //localStorage.removeItem("refresh_token");
    //localStorage.removeItem("is_regular");
    localStorage.clear();
    window.location.href = '/home';
  };
  const continueRegistration = () => {
    window.location.href = '/register';
  };
  const goToApproval = () => {
    window.location.href = '/regadmin/approval';
  };
  const goToStepSetup = () => {
    window.location.href = '/regadmin/setupstep';
  };
  return (
    <div>
      {isLoggedIn ? (
        isRegular ? (
          isSuper ? (
            <div className={'container'}>
              <h2>Welcome to BLRY!</h2>
              <div className={'row'}>
                <div>管理员选项</div>
                <div>
                  <button className={'btn btn-primary'} onClick={goToApproval}>用户注册审批</button>
                  {'     '}
                  <button className={'btn btn-primary'} onClick={goToStepSetup}>设置注册问题</button>
                  {'     '}
                  <button className={'btn btn-secondary'} onClick={handleLogout}>退出登录</button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2>Welcome to BLRY!</h2>
              <button>进入平台</button>
              <button onClick={handleLogout}>退出登录</button>
            </div>
          )
        ) : (
          <div>
            <h2>Welcome to BLRY!</h2>
            <button className={'btn btn-primary'} onClick={continueRegistration}>
              继续注册步骤
            </button>
            {'     '}
            <button className={'btn btn-secondary'} onClick={handleLogout}>退出登录</button>
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
        <Login onLogin={handleLogin()} />
      )}

      {!isLoggedIn && (
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? '登录' : '注册新用户'}
        </button>
      )}
    </div>
  );
}
