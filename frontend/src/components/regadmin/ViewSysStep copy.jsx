import { useState, useEffect } from 'react';
import { getSysStepDetail, updateSysStepDetail, updateQuestionSequence } from '../../api/regadminAPI';
import { Link, useParams } from 'react-router-dom';
const ViewSysStepBackup = () => {
  const { stepid } = useParams();
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(''); //
  const [sysStep, setSysStep] = useState(null);
  const [stepQuestions, setStepQuestions] = useState([]);
  const [questionList, setQuestionList] = useState([]);
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
    const loadSysSteps = async () => {
      try {
        var webSysStepDetail = await getSysStepDetail(
          token_local,
          username_local,
          stepid
        );
        console.log('webSysStepDetail', webSysStepDetail);
        if (webSysStepDetail != null) {
          setSysStep(webSysStepDetail.sys_step);
          setQuestionList(webSysStepDetail.sys_step.questions);
          setStepQuestions(webSysStepDetail.step_questions);
        }
      } catch (error) {
        setErrorMsg(error);
        setShowErrorMsg(true);
      }
    };
    loadSysSteps();
    //var webUserStepList = getUserSteps(username_local);
    //console.log(webUserStepList);
  }, [stepid]);
  const closeStep = () => {
    //window.location.href = '/approve';
    //updateStep(token);
    //window.location.href = '/regadmin/setupstep';
    window.close();
  };
  const updateStep = async () => {
    setShowUpdating(true);
    var result = await updateSysStepDetail(username, token, stepid, sysStep, false);
    console.log('updateStep result', result);
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
  const handleQuestionSubjectChange = (questionid, newValue) => {
    console.log(questionid, newValue);
  };
  const handleQuestionDescriptionChange = (questionid, newValue) => {
    console.log(questionid, newValue);
  };
  const handleQuestionAnswerRequired = (questionid, newValue) => {
    console.log(questionid, newValue);
  };
  const handleQuestionSequenceChange = (questionid, newValue) => {
    console.log(questionid, newValue);
  };
  const createQuestionItem = (step_question) => {
    return (
      <div>
        <div className={'border-bottom'}>
        <div
          className={'row mx-md-n5'}
          key={'question_row_' + step_question.question_id}
        >
          <div className={'col-md-1'}>
            <label>Sequence</label>
          </div>
          <div className={'col-md-1'}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id={'question_' + step_question.question_id + '_seq'}
                value={step_question.question_seq}
                required
                onChange={(e) => {
                  handleQuestionSequenceChange(
                    step_question.question_id,
                    e.target.value
                  );
                }}
              />
              <div className={'invalid-feedback'}>答案不符合要求</div>
            </div>
          </div>
          <div className={'col-md-1'}>
            <label>
              Subject<label style={{ color: 'red' }}>{'*'}</label>
            </label>
          </div>
          <div className={'col-md-4'}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id={'question_' + step_question.question_id + '_subject'}
                value={step_question.question_subject}
                required
                onChange={(e) => {
                  handleQuestionSubjectChange(
                    step_question.question_id,
                    e.target.value
                  );
                }}
              />
              <div className={'invalid-feedback'}>答案不符合要求</div>
            </div>
          </div>
          <div className={'col-md-3'}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={step_question.question_answer_required}
                id={
                  'question_' + step_question.question_id + '_answer_required'
                }
                key={
                  'question_' + step_question.question_id + '_answer_required'
                }
                checked={step_question.question_answer_required}
                onChange={(e) => {
                  handleQuestionAnswerRequired(
                    step_question.question_id,
                    e.target.checked
                  );
                }}
              />
              <label
                className="form-check-label"
                htmlFor={
                  'question_' + step_question.question_id + '_answer_required'
                }
              >
                Answer Required
              </label>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col-md-1'}>Description</div>
          <div className={'col-md-9'}>
            <textarea
              id={'question_' + step_question.question_id + '_description'}
              value={step_question.question_description ?? ''} // The value attribute controls the displayed text
              //onChange={handleChange} // The onChange event updates the state
              rows={3} // Optional: specify the default number of visible lines
              cols={50} // Optional: specify the default width in characters
              onChange={(e) => {
                handleQuestionDescriptionChange(
                  step_question.question_id,
                  e.target.value
                );
              }}
            />
            <div className={'invalid-feedback'}>答案不符合要求</div>
          </div>
        </div>
      </div>
        <br></br>
      </div>
    );
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
            {sysStep?.step_seq + '. ' + sysStep?.subject}
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
              {'     '}
              <button
                type="button"
                className={'btn btn-primary mx-md-n2'}
                onClick={() => updateQuestionSequence()}
              >
                {showUpdating ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                  ></span>
                ) : (
                  <></>
                )}
                更新问题顺序
              </button>
              {'     '}
              <Link
                className={'btn btn-primary mx-md-n2'}
                to={{
                  pathname: `/regadmin/setupstep/createquestion`
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
              添加新问题
              </Link>
            </div>
            <br></br><br></br>
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
          <br></br>
          <div className={'row bg-info text-white text-certer'}>
            Questions Section
          </div>
          {stepQuestions
            .sort((a, b) => a.question_seq - b.question_seq)
            .map((stepQuestion) => {
              return createQuestionItem(stepQuestion);
            })}
        </div>
        <div>
          <div></div>
        </div>
      </form>
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-md-3'}></div>
          {questionList ? (
            <div className={'col-md-6 p-3'}>
              <button
                type="button"
                className={'btn btn-secondary mx-md-n2'}
                onClick={() => closeStep()}
              >
                关闭
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className={'col-md-3'}></div>
        </div>
      </div>
    </div>
  );
};
export default ViewSysStepBackup;
