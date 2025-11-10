import { useState, useEffect } from 'react';
import '../../style/Registration.css'; // Import your CSS file
import {
  getUserStepToApprove
} from '../../api/regadminAPI';
import { Link } from 'react-router-dom';

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [userStepList, setUserStepList] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    var username_local = localStorage.getItem('username');
    var token_local = localStorage.getItem('access_token');
    if (username_local && token_local) {
      //--- Do Nothing ---//
    } else {
      window.location.href = '/home';
    }
    if (username_local != null) {
      setUsername(username_local);
    }
    const loadUserStepToApprove = async (token_local, username_load) => {
      try {
        var webUserStepList = await getUserStepToApprove(
          username_load,
          token_local
        );
        console.log('webUserStepList', webUserStepList);
        setUserStepList(webUserStepList);
      } catch (error) {
        setErrorMsg(error);
        setShowErrorMsg(true);
      }
    };
    loadUserStepToApprove(token_local, username_local);
    //var webUserStepList = getUserSteps(username_local);
    //console.log(webUserStepList);
  }, []);
  return (
    <div>
      <nav className={'navbar bg-body-tertiary'}>
        <div
          className={'container-fluid'}
          style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
        >
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-md-3'}>
                <button
                  type="button"
                  className={'btn btn-primary mx-md-n2'}
                  onClick={() => {window.location.href = '/home';}}
                >
                  回主页
                </button>
              </div>
              <div className={'col-md-3 text-center'}>百里认一注册审批</div>
              <div className={'col-md-3'}></div>
            </div>
          </div>
        </div>
      </nav>
      <label>{'Hi, ' + username}</label>
      <br />
      {showErrorMsg ? (
        <>
          <label>{'Issue: ' + errorMsg}</label>
          <br />
        </>
      ) : (
        <></>
      )}
      <br />
      <form>
        <div className={'container'}>
          <div
            className={'row'}
            style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
          >
            <div className="col-md-2">新用户</div>
            <div className="col-md-3">当前步骤</div>
            <div className="col-md-7"></div>
          </div>
          {userStepList.map((userStep) => {
            //var identity = userStep.step_id + '_' + userStep.register_id;
            return (
              <div className={'row border-bottom'}>
                <div className="col-md-2">{userStep.username}</div>
                <div className="col-md-3">
                  <Link
                    to={{
                      pathname: `/regadmin/approval/${userStep.register_id}/${userStep.step_id}`,
                      search: '?regid=' + userStep.register_id + '&stepid=' + userStep.step_id
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                  {userStep.step_subject}
                  </Link>
                  </div>
                <div className="col-md-6"></div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
export default RegisterUser;
