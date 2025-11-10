import { useState, useEffect } from 'react';
import '../../style/Registration.css'; // Import your CSS file
import {
  getAllSysStep,
  updateSequenceForSysStep
} from '../../api/regadminAPI';
import { Link } from 'react-router-dom';

const SetupStep = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [sysStepList, setSysStepList] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showUpdating, setShowUpdating] = useState(false);
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
    if (token_local != null) {
      setToken(token_local);
    }
    const loadSetupStep = async (token_local, username_load) => {
      try {
        var webSysStepList = await getAllSysStep(
          username_load,
          token_local
        );
        console.log('webSysStepList', webSysStepList);
        setSysStepList(webSysStepList);
      } catch (error) {
        setErrorMsg(error);
        setShowErrorMsg(true);
      }
    };
    loadSetupStep(token_local, username_local);
    //var webUserStepList = getUserSteps(username_local);
    //console.log(webUserStepList);
  }, []);
  const handleSequenceChange = (stepid, stepSequence) => {
    var stepsTosave = sysStepList.map((sysstep) => {
      if (sysstep.step_id == stepid) {
        const updatedStep = {
          ...sysstep,
          step_seq: stepSequence
        };
        return updatedStep;
      } else {
        return sysstep;
      }
    });
    setSysStepList(stepsTosave);
  };
  const updateChangedSteps = async () => {
    setShowUpdating(true);
    var result = await updateSequenceForSysStep(username, sysStepList, token);
    setShowUpdating(false);
    if (result.success=='') {
      alert('步骤顺序更新成功！');
    } else {
      alert(result.success);
    }
  };
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
              <div className={'col-md-3 text-center'}>百里认一注册步骤设置</div>
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
          <div>
            <div>
              <button
                type="button"
                className={'btn btn-primary mx-md-n2'}
                onClick={() => updateChangedSteps()}
              >
                {showUpdating ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                  ></span>
                ) : (
                  <></>
                )}
                更新顺序
              </button>
              {'     '}
              <Link
                className={'btn btn-primary mx-md-n2'}
                to={{
                  pathname: `/regadmin/setupstep/createstep`
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
              添加新步骤
              </Link>
            </div>
          </div>
          <div
            className={'row'}
            style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
          >
            <div className="col-md-2">步骤顺序</div>
            <div className="col-md-6">步骤主题</div>
            <div className="col-md-4"></div>
          </div>
          {sysStepList
          .sort((a, b) => b.step_seq == 0 ? -1 : a.step_seq - b.step_seq)
          .map((sysStep) => {
            return (
              <div className={'row border-bottom'}>
                <div className="col-md-2 form-check">
                  <input
                    type="text"
                    className="form-control"
                    id={'sys_step_' + sysStep.step_id}
                    value={sysStep.step_seq}
                    onChange={(e) => {
                      handleSequenceChange(
                        sysStep.step_id,
                        e.target.value
                      );
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <Link
                    to={{
                      pathname: `/regadmin/setupstep/${sysStep.step_id}`
                    }}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                  {sysStep.subject}
                  </Link>
                </div>
                <div className="col-md-4">{''}</div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
export default SetupStep;
