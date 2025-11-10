import { useState, useEffect } from 'react';
import '../../style/Registration.css'; // Import your CSS file
import {
  approveUserSteps,
  getUserStepToApprove,
  rejectUserSteps,
} from '../../api/regadminAPI';
import { Link } from 'react-router-dom';

const Approval = () => {
  const [username, setUsername] = useState('');
  const [userStepList, setUserStepList] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showApproving, setShowApproving] = useState(false);
  const [showRejecting, setShowRejecting] = useState(false);
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
  const handleApproveSelectionChange = (stepid, registerid, selected) => {
    console.log('selected', selected);
    var stepsTosave = userStepList.map((userstep) => {
      if (userstep.step_id == stepid && userstep.register_id == registerid) {
        //--- TODO: Adding virtual 'Selected' field. currently user the approved is used for that purpose ---//
        const updatedStep = {
          ...userstep,
          approved: selected,
          approved_by: selected ? username : null,
        };
        return updatedStep;
      } else {
        return userstep;
      }
    });
    setUserStepList(stepsTosave);
  };
  const approveSelected = async () => {
    setShowApproving(true);
    var stepsToApprove = userStepList
      .filter((m) => m.approved == true)
      .map((step) => {
        return {
          step_id: step.step_id,
          register_id: step.register_id,
        };
      });
    var result = await approveUserSteps(username, stepsToApprove);
    setShowApproving(false);
    if (result.err_steps.length == 0) {
      alert('批准成功！');
    } else {
      var errs = '';
      result.err_steps.each((userStep) => {
        errs +=
          '用户 ' +
          userStep.username +
          ' 步骤 ' +
          userStep.step_subject +
          ' 批准失败.';
      });
      alert(errs);
    }
    window.location.reload();
  };
  const rejectSelected = async () => {
    setShowRejecting(true);
    var stepsToReject = userStepList
      .filter((m) => m.approved == true)
      .map((step) => {
        return {
          step_id: step.step_id,
          register_id: step.register_id,
        };
      });
    var result = await rejectUserSteps(username, stepsToReject);
    setShowRejecting(false);
    if(result.success != null)
    {
      alert(result.success);
    }
    else if (result.length == 0) {
      alert('退回成功！');
      //window.location.href = '/register';
    } else {
      var errs = '';
      result.err_steps.each((userStep) => {
        errs +=
          '用户 ' +
          userStep.username +
          ' 步骤 ' +
          userStep.step_subject +
          ' 退回失败.';
      });
      alert(errs);
    }
    window.location.reload();
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
          <div>
            <div>
              <button
                type="button"
                className={'btn btn-primary mx-md-n2'}
                onClick={() => approveSelected()}
              >
                {showApproving ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                  ></span>
                ) : (
                  <></>
                )}
                批准进入下一步
              </button>
              {'      '}
              <button
                type="button"
                className={'btn btn-primary mx-md-n2'}
                onClick={() => rejectSelected()}
              >
                {showRejecting ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                  ></span>
                ) : (
                  <></>
                )}
                退回修改
              </button>
            </div>
          </div>
          <div
            className={'row'}
            style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
          >
            <div className="col-md-1">选择</div>
            <div className="col-md-2">新用户</div>
            <div className="col-md-3">批准步骤</div>
            <div className="col-md-6"></div>
          </div>
          {userStepList.map((userStep) => {
            var identity = userStep.step_id + '_' + userStep.register_id;
            return (
              <div className={'row border-bottom'}>
                <div className="col-md-1 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={identity}
                    id={'approve_' + identity}
                    key={'approve_' + identity}
                    onChange={(e) => {
                      handleApproveSelectionChange(
                        userStep.step_id,
                        userStep.register_id,
                        e.target.checked
                      );
                    }}
                  />
                </div>
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
export default Approval;
