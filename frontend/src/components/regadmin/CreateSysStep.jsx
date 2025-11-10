import { useState, useEffect } from 'react';
import { updateSysStepDetail } from '../../api/regadminAPI';
const CreateSysStep = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(''); //
  const [sysStep, setSysStep] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showUpdating, setShowUpdating] = useState(false);
  //console.log('ViewAllSites state', state);
  useEffect(() => {
    const username_local = localStorage.getItem('username');
    const token_local = localStorage.getItem('token');
    if (username_local != null) {
      setUsername(username_local);
    }
    if (token_local != null) {
      setToken(token_local);
    }
    setSysStep({step_id:-1});
    setErrorMsg('');
    setShowErrorMsg(false);
    //var webUserStepList = getUserSteps(username_local);
    //console.log(webUserStepList);
  }, []);
  const closeStep = () => {
    window.close();
  };
 const updateStep = async () => {
     setShowUpdating(true);
     var result = await updateSysStepDetail(username, token, null, sysStep, true);
     if(result && result.success)
    {
      alert('步骤更新成功！');
    }
    else if (result.errmsg){
      alert('更新失败. ' + result.errmsg);
    }
    else {
      alert('更新失败. ');
    }
    setShowUpdating(false);
   };
  const handleSubjectChange = (newValue) => {
    setSysStep((prevStep) => ({ ...prevStep, subject: newValue }));
  };
  const handleDescriptionChange = (newValue) => {
    setSysStep((prevStep) => ({ ...prevStep, description: newValue }));
  };
  const handleApprovalRequiredChange = (newValue) => {
    setSysStep((prevStep) => ({ ...prevStep, approval_required: newValue }));
  };
  return (
    <div>
      <nav className={'navbar bg-body-tertiary'}>
        <div
          className={'container-fluid '}
          style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
        >
          <div className={'col-md-4'}>{'Hi, ' + username}</div>
          <div className={'col-md-4 text-center'}>
            Create a new Step
          </div>
          <div className={'col-md-4 d-flex justify-content-end'}>
            <button
              type="button"
              className={'btn btn-secondary mx-md-n2'}
              onClick={() => {
                closeStep();
              }}
            >
              关闭
            </button>
          </div>
        </div>
      </nav>
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
          <div className={'row'}>
            <div>
              <button
                type="button"
                className={'btn btn-primary mx-md-n2'}
                onClick={() => updateStep()}
              >
                {showUpdating ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                  ></span>
                ) : (
                  <></>
                )}
                更新步骤
              </button>
            </div>
            <br></br>
          </div>
          <div className={'row'} style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}>Step Section</div>
          <div className={'row'}>
            <div>
              Step Subject<label style={{ color: 'red' }}>{'*'}</label>
            </div>
            <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id={'step_' + sysStep?.step_id + '_subject'}
                  value={sysStep?.subject}
                  //required={step_question.question_answer_required}
                  required
                  onChange={(e) => {
                    handleSubjectChange(e.target.value);
                  }}
                />
                <div className={'invalid-feedback'}>答案不符合要求</div>
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div>Step Description</div>
            <div>
              <div>
                <textarea
                  id={'step_' + sysStep?.step_id + '_description'}
                  value={sysStep?.description ?? ''} // The value attribute controls the displayed text
                  //onChange={handleChange} // The onChange event updates the state
                  rows={5} // Optional: specify the default number of visible lines
                  cols={30} // Optional: specify the default width in characters
                  onChange={(e) => {
                    handleDescriptionChange(e.target.value);
                  }}
                />
                <div className={'invalid-feedback'}>答案不符合要求</div>
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={sysStep?.approval_required}
                id={'step_' + sysStep?.step_id + '_approval_required'}
                key={'step_' + sysStep?.step_id + '_approval_required'}
                checked={sysStep?.approval_required}
                onChange={(e) => {
                  handleApprovalRequiredChange(e.target.checked);
                }}
              />
              <label
                className="form-check-label"
                htmlFor={'step_' + sysStep?.step_id + '_approval_required'}
              >
                Step Approval Required
              </label>
            </div>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </form>
    </div>
  );
};
export default CreateSysStep;
