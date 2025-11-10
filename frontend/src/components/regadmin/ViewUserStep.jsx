import { useState, useEffect } from 'react';
import { getUserFullStep } from '../../api/registerAPI';
import { useParams } from 'react-router-dom';
const ViewUserStep = () => {
  const { regid, stepid} = useParams();
  const [username, setUsername] = useState('');
  //const [token, setToken] = useState(''); //
  const [userAnswerList, setUserAnswerList] = useState([]);
  const [userStep, setUserStep] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  //console.log('ViewAllSites state', state);
  useEffect(() => {
    const username_local = localStorage.getItem('username');
    const token_local = localStorage.getItem('token');
    if (username_local != null) {
      setUsername(username_local);
    }
    if (token_local != null) {
      //setToken(token_local);
    }
    const loadSysSteps = async () => {
      try {
        var webUserFullStep = await getUserFullStep(
          token_local,
          regid,
          stepid
        );
        console.log('webUserStepList', webUserFullStep);
        if (webUserFullStep != null) {
          setUserStep(webUserFullStep.user_step);
          setUserAnswerList(webUserFullStep.answers);
        }
      } catch (error) {
        setErrorMsg(error);
        setShowErrorMsg(true);
      }
    };
    loadSysSteps();
    //var webUserStepList = getUserSteps(username_local);
    //console.log(webUserStepList);
  },[regid, stepid]);
  const closeStep = () => {
    //window.location.href = '/approve';
    window.close();
  };
  const createQuestionItem = (answer) => {
    var step_question = answer?.step_question;
    var question_options = answer?.question_options ?? [];
    var identity =
      step_question.step_id.toString() +
      '_' +
      step_question.question_id.toString();
    //console.log(step_question.question_answer_type == 'Text')
    return (
      <div>
        <div className={'row mx-md-n5'} key={'question_row_' + identity}>
          <div className={'col-md-3'}></div>
          <div
            className={'col-md-6 p-3 border bg-light'}
            key={'question_div_' + identity}
          >
            <label
              htmlFor={'answer_input_' + identity}
              className={'form-label'}
            >
              {step_question.question_seq + '. '}
              {step_question.question_subject}
              {step_question.question_answer_required ? (
                <>
                  <label style={{ color: 'red' }}>{'*'}</label>
                </>
              ) : (
                <></>
              )}
            </label>
            <div>
              {step_question.question_answer_type == 'List' ? (
                <div>
                  <div>{answer.answer_content}</div>
                </div>
              ) : (
                <></>
              )}
              {step_question.question_answer_type == 'Multiple' ? (
                <>
                  {question_options
                    .sort((a, b) => a.option_seq - b.option_seq)
                    .map((sysOption) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={sysOption.subject}
                          id={'answer_' + identity + '_' + sysOption.option_seq}
                          key={
                            'answer_' + identity + '_' + sysOption.option_seq
                          }
                          disabled={true}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={
                            'answer_' + identity + '_' + sysOption.option_seq
                          }
                        >
                          {sysOption.subject}
                        </label>
                      </div>
                    ))}
                </>
              ) : (
                <></>
              )}
              {step_question.question_answer_type == 'Paragraph' ? (
                <div>
                  {
                      step_question.question_min_length > 0 ? <p>注：篇幅不少于{step_question.question_min_length}个字</p>:<></>
                  }
                  <textarea
                    id={'answer_' + identity}
                    value={answer.answer_content ?? ""} // The value attribute controls the displayed text
                    //onChange={handleChange} // The onChange event updates the state
                    rows={5} // Optional: specify the default number of visible lines
                    cols={30} // Optional: specify the default width in characters
                    readOnly={true}
                  />
                </div>
              ) : (
                <></>
              )}
              {step_question.question_answer_type == 'Text' ? (
                <div>
                  <div
                    style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
                  >
                    {answer.answer_content}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={'col-md-3'}></div>
        </div>
        <div className={'mx-md-n2'}>{''}</div>
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
            {userStep?.step_seq + '. ' + userStep?.step_subject}
          </div>
          <div className={'col-md-4 d-flex justify-content-end'}><button
                type="button"
                className={'btn btn-secondary mx-md-n2'}
                onClick={() => {closeStep()}}
              >
                关闭
              </button></div>
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
          {userAnswerList
            .sort((a, b) => a.question_seq - b.question_seq)
            .map((answer) => {
              return createQuestionItem(answer);
            })}
        </div>
      </form>
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-md-3'}></div>
          {(userStep) ? (
            <div className={'col-md-6 p-3'}>
              <button
                type="button"
                className={'btn btn-secondary mx-md-n2'}
                onClick={() => closeStep()}
              >
                关闭
              </button>
            </div>
          ) : <></>}
          <div className={'col-md-3'}></div>
        </div>
      </div>
    </div>
  );
};
export default ViewUserStep;