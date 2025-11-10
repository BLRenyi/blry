import { useState, useEffect } from 'react';
import { getUserFullStep, updateUserAnswersByStep } from '../../api/registerAPI';
import { useParams } from 'react-router-dom';
const ViewStep = () => {
  const { stepid } = useParams();
  const [username, setUsername] = useState('regTest');
  const [registerid, setRegisterID] = useState(1);
  //const [token, setToken] = useState(''); //
  const [userAnswerList, setUserAnswerList] = useState([]);
  const [userStep, setUserStep] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showSaving, setShowSaving] = useState(false);
  const [showSubmitting, setShowSubmitting] = useState(false);
  //console.log('ViewAllSites state', state);
  useEffect(() => {
    const username_local = localStorage.getItem('username');
    const registerid_local = localStorage.getItem('registerid');
    const token_local = localStorage.getItem('token');
    if (username_local != null) {
      setUsername(username_local);
    }
    if (registerid_local != null) {
      setRegisterID(parseInt(registerid_local));
    }
    if (token_local != null) {
      //setToken(token_local);
    }
    const loadSysSteps = async () => {
      try {
        var webUserFullStep = await getUserFullStep(
          token_local,
          registerid_local,
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
  }, [stepid]);
  const handleAnswerContentChange = (questionid, answerContent) => {
    var answersTosave = userAnswerList.map((answer) => {
      if (answer.step_question.question_id == questionid) {
        return {
          step_question: answer.step_question,
          answer_content: answerContent,
          answer_addtional_input: answer.answer_addtional_input,
        };
      } else {
        return answer;
      }
    });
    setUserAnswerList(answersTosave);
  };
  /*
  const handleAddtionalInputChange = (questionid, addiontalInput) => {
    var answersTosave = userAnswerList.map((answer) =>
      {
        if(answer.step_question.question_id == questionid)
        {
          return {
            'step_question': answer.step_question,
            'answer_content': answer.answer_content,
            'answer_addtional_input': addiontalInput
          };
        }
        else
        {
          return answer;
        }
      }
    );
    setUserAnswerList(answersTosave);
  };
  */
  const saveUserAnswers = async () => {
    setShowSaving(true);
    var answersTosave = userAnswerList.map((answer) => {
      return {
        answer_id: answer.answer_id,
        register_id: registerid,
        question_id: answer.step_question.question_id,
        content: answer.answer_content,
        addtional_input: answer.answer_addtional_input,
      };
    });
    var result = await updateUserAnswersByStep(
      userStep.step_id,
      userStep.user_step_id,
      registerid,
      answersTosave,
      false
    );
    setShowSaving(false);
    if (result.success) {
      alert('保存成功！');
    }
  };
  const submitUserAnswers = async () => {
    setShowSubmitting(true);
    var answersTosave = userAnswerList.map((answer) => {
      return {
        answer_id: answer.answer_id,
        register_id: registerid,
        question_id: answer.step_question.question_id,
        content: answer.answer_content,
        addtional_input: answer.answer_addtional_input,
      };
    });
    var result = await updateUserAnswersByStep(
      userStep.step_id,
      userStep.user_step_id,
      registerid,
      answersTosave,
      true
    );
    setShowSubmitting(false);
    if (result.success) {
      alert('提交成功！');
      window.location.href = '/register';
    }
    else
    {
      alert('提交失败');
    }
  };
  const closeStep = () => {
    window.location.href = '/register';
  };
  const createQuestionItem = (submitted, answer) => {
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
              {!submitted && step_question.question_answer_type == 'List' ? (
                <div>
                  <select
                    className="form-select"
                    id={'answer_input_' + identity}
                  >
                    {question_options.map((sysOption) => (
                      <option
                        selected={sysOption.subject == answer.answer_content}
                        value={sysOption.subject}
                        key={'answer_' + identity + '_' + sysOption.option_seq}
                        title={sysOption.description}
                      >
                        {sysOption.subject}
                      </option>
                    ))}
                  </select>
                  <div className={'invalid-feedback'}>答案不符合要求</div>
                </div>
              ) : (
                <></>
              )}
              {submitted && step_question.question_answer_type == 'List' ? (
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
                          onChange={(e) => {
                            if (submitted) {
                              return;
                            } else {
                              handleAnswerContentChange(
                                step_question.question_id,
                                e.target.value
                              );
                            }
                          }}
                          disabled={submitted}
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
                  <div className={'invalid-feedback'}>答案不符合要求</div>
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
                    readOnly={submitted}
                    onChange={(e) => {
                      if (submitted) {
                        return;
                      } else {
                        handleAnswerContentChange(
                          step_question.question_id,
                          e.target.value
                        );
                      }
                    }}
                  />
                  <div className={'invalid-feedback'}>答案不符合要求</div>
                </div>
              ) : (
                <></>
              )}
              {!submitted && step_question.question_answer_type == 'Text' ? (
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id={'answer_' + identity}
                    value={answer.answer_content}
                    //required={step_question.question_answer_required}
                    required={step_question.question_seq == 2}
                    onChange={(e) => {
                      handleAnswerContentChange(
                        step_question.question_id,
                        e.target.value
                      );
                    }}
                  />
                  <div className={'invalid-feedback'}>答案不符合要求</div>
                </div>
              ) : (
                <></>
              )}
              {submitted && step_question.question_answer_type == 'Text' ? (
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
            <div id={'inputHelp_' + identity} className="form-text">
              {step_question.question_description}
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
                onClick={() => closeStep()}
              >
                放弃 & 关闭
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
              return createQuestionItem(userStep.submitted, answer);
            })}
        </div>
      </form>
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-md-3'}></div>
          {(userStep && userStep.submitted) ? (
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
            <div className={'col-md-6 p-3'}>
              <button
                type="button"
                className={'btn btn-primary mx-md-n2'}
                onClick={() => saveUserAnswers()}
              >
                {showSaving ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                    aria-hidden={showSaving}
                  ></span>
                ) : (
                  <></>
                )}
                保存
              </button>
              {'      '}
              <button
                type="submit"
                className={'btn btn-primary mx-md-n2'}
                onClick={() => submitUserAnswers()}
              >
                {showSubmitting ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                    aria-hidden={showSaving}
                  ></span>
                ) : (
                  <></>
                )}
                提交
              </button>
              {'      '}
              <button
                type="button"
                className={'btn btn-secondary mx-md-n2'}
                onClick={() => closeStep()}
              >
                放弃 & 关闭
              </button>
            </div>
          )}
          <div className={'col-md-3'}></div>
        </div>
      </div>
    </div>
  );
};
export default ViewStep;