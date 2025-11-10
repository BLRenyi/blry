import { useState, useEffect } from 'react';
import {
  getSysQuestionDetail,
  updateSysQuestionDetail,
} from '../../api/regadminAPI';
import { Link, useParams } from 'react-router-dom';
const ViewSysQuestion = () => {
  const { questionid } = useParams();
  const [username, setUsername] = useState('');
  const [token, setToken] = useState(''); //
  const [sysQuestion, setSysQuestion] = useState(null);
  const [questionOptions, setQuestionOptions] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showUpdating, setShowUpdating] = useState(false);
  const answerTypeList = ['Text', 'List', 'Multiple', 'Paragraph'];
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
        var webSysQuestionDetail = await getSysQuestionDetail(
          token_local,
          username_local,
          questionid
        );
        console.log('webSysQuestionDetail', webSysQuestionDetail);
        if (webSysQuestionDetail != null) {
          setSysQuestion(webSysQuestionDetail.sys_question);
          setQuestionOptions(webSysQuestionDetail.question_options);
        }
      } catch (error) {
        setErrorMsg(error);
        setShowErrorMsg(true);
      }
    };
    loadSysSteps();
    //var webUserStepList = getUserSteps(username_local);
    //console.log(webUserStepList);
  }, [questionid]);
  const closeStep = () => {
    //window.location.href = '/approve';
    //updateStep(token);
    //window.location.href = '/regadmin/setupstep';
    window.close();
  };
  const updateQuestion = async () => {
    setShowUpdating(true);
    var result = await updateSysQuestionDetail(
      username,
      token,
      null,
      questionid,
      sysQuestion,
      false
    );
    if (result && result.success) {
      alert('问题更新成功！');
    } else if (result.errmsg) {
      alert('更新失败. ' + result.errmsg);
    } else {
      alert('更新失败. ');
    }
    setShowUpdating(false);
  };
  const handleSubjectChange = (newValue) => {
    setSysQuestion((prevStep) => ({ ...prevStep, subject: newValue }));
  };
  const handleDescriptionChange = (newValue) => {
    setSysQuestion((prevStep) => ({ ...prevStep, description: newValue }));
  };
  const handleAnswerRequiredChange = (newValue) => {
    setSysQuestion((prevStep) => ({ ...prevStep, answer_required: newValue }));
  };
  const handleMinLengthChange = (newValue) => {
    setSysQuestion((prevStep) => ({ ...prevStep, min_length: newValue }));
  };
  const handleAnswerTypeChange = (newValue) => {
    setSysQuestion((prevStep) => ({ ...prevStep, answer_type: newValue }));
  };
  const handleOptionSequenceChange = (question_option_id, newValue) => {
    console.log(questionid, newValue);
  };
  const handleOptionSubjectChange = (question_option_id, newValue) => {
    console.log(questionid, newValue);
  };
  const handleOptionDescriptionChange = (question_option_id, newValue) => {
    console.log(questionid, newValue);
  };
  const handleOptionAllowInputChange = (question_option_id, newValue) => {
    console.log(questionid, newValue);
  };
  const createOptionItem = (question_option) => {
    return (
      <div>
        <div className={'border-bottom'}>
          <div
            className={'row mx-md-n5'}
            key={'option_row_' + question_option.question_option_id}
          >
            <div className={'col-md-1'}>
              <label>Sequence</label>
            </div>
            <div className={'col-md-1'}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id={'option_' + question_option.question_option_id + '_seq'}
                  value={question_option.option_seq}
                  required
                  onChange={(e) => {
                    handleOptionSequenceChange(
                      question_option.question_option_id,
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
                  id={
                    'option_' + question_option.question_option_id + '_subject'
                  }
                  value={question_option.subject}
                  required
                  onChange={(e) => {
                    handleOptionSubjectChange(
                      question_option.question_option_id,
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
                  value={question_option.allow_input}
                  id={
                    'option_' +
                    question_option.question_option_id +
                    '_allow_input'
                  }
                  key={
                    'option_' +
                    question_option.question_option_id +
                    '_allow_input'
                  }
                  checked={question_option.allow_input}
                  onChange={(e) => {
                    handleOptionAllowInputChange(
                      question_option.question_option_id,
                      e.target.checked
                    );
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={
                    'option_' +
                    question_option.question_option_id +
                    '_allow_input'
                  }
                >
                  Allow Input
                </label>
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-md-1'}>Description</div>
            <div className={'col-md-9'}>
              <textarea
                id={'question_' + question_option.question_id + '_description'}
                value={question_option.question_description ?? ''} // The value attribute controls the displayed text
                //onChange={handleChange} // The onChange event updates the state
                rows={3} // Optional: specify the default number of visible lines
                cols={50} // Optional: specify the default width in characters
                onChange={(e) => {
                  handleOptionDescriptionChange(
                    question_option.question_option_id,
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
            Question #{sysQuestion?.question_id}
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
                onClick={() => updateQuestion()}
              >
                {showUpdating ? (
                  <span
                    className={'spinner-border spinner-border-sm'}
                    role="status"
                  ></span>
                ) : (
                  <></>
                )}
                更新问题
              </button>
              {'     '}
              <Link
                className={'btn btn-primary mx-md-n2'}
                to={{
                  pathname: `/regadmin/setupstep/createquestion`,
                }}
                rel="noopener noreferrer"
                target="_blank"
              >
                添加新问题
              </Link>
            </div>
            <br></br>
            <br></br>
          </div>
          <div
            className={'row'}
            style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
          >
            Question Section
          </div>
          <div className={'row'}>
            <div className={'col-md-2'}>
              Question Subject<label style={{ color: 'red' }}>{'*'}</label>
            </div>
            <div className={'col-md-5'}>
              <div className="form-group">
                <textarea
                  id={'question_' + sysQuestion?.question_id + '_subject'}
                  value={sysQuestion?.subject ?? ''} // The value attribute controls the displayed text
                  //onChange={handleChange} // The onChange event updates the state
                  rows={3} // Optional: specify the default number of visible lines
                  cols={80} // Optional: specify the default width in characters
                  onChange={(e) => {
                    handleSubjectChange(e.target.value);
                  }}
                />
                <div className={'invalid-feedback'}>答案不符合要求</div>
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-md-2'}>Question Description</div>
            <div className={'col-md-4'}>
              <div>
                <textarea
                  id={'question_' + sysQuestion?.question_id + '_description'}
                  value={sysQuestion?.description ?? ''} // The value attribute controls the displayed text
                  //onChange={handleChange} // The onChange event updates the state
                  rows={3} // Optional: specify the default number of visible lines
                  cols={80} // Optional: specify the default width in characters
                  onChange={(e) => {
                    handleDescriptionChange(e.target.value);
                  }}
                />
                <div className={'invalid-feedback'}>答案不符合要求</div>
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-md-2'}>Min Length</div>
            <div className={'col-md-4'}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id={'question_' + sysQuestion?.question_id + '_minlength'}
                  value={sysQuestion?.min_length}
                  onChange={(e) => {
                    handleMinLengthChange(e.target.value);
                  }}
                />
                <div className={'invalid-feedback'}>答案不符合要求</div>
              </div>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-md-2'}>Answer Type</div>
            <div className={'col-md-4'}>
              <select
                className="form-select"
                id={'question_' + sysQuestion?.question_id + '_answertype'}
                onChange={(e) => {
                  handleAnswerTypeChange(e.target.value);
                }}
              >
                {answerTypeList.map((answerType, index) => (
                  <option
                    selected={answerType == sysQuestion?.answer_type}
                    value={answerType}
                    id={
                      'question_' +
                      sysQuestion?.question_id +
                      '_answertype_' +
                      index
                    }
                  >
                    {answerType}
                  </option>
                ))}
              </select>
              <div className={'invalid-feedback'}>答案不符合要求</div>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-md-6'}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={sysQuestion?.answer_required}
                  id={
                    'question_' + sysQuestion?.question_id + '_answer_required'
                  }
                  key={
                    'question_' + sysQuestion?.question_id + '_answer_required'
                  }
                  checked={sysQuestion?.answer_required}
                  onChange={(e) => {
                    handleAnswerRequiredChange(e.target.checked);
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor={
                    'question_' + sysQuestion?.question_id + '_answer_required'
                  }
                >
                  Question Answer Required
                </label>
              </div>
            </div>
          </div>
          <br></br>
          {sysQuestion.answer_type != 'List' && sysQuestion.answer_type != 'Multiple' ? (
            <></>
          ) : (
            <>
              <div className={'row bg-info text-white text-certer'}>
                Question Option Section
              </div>
              <div className={'row mx-md-n5 bg-secondary'}>
                <div className="col-md-2">选项顺序</div>
                <div className="col-md-6">选项主题</div>
                <div className="col-md-4"></div>
              </div>
              {questionOptions
                .sort((a, b) => a.option_seq - b.option_seq)
                .map((questionOption) => {
                  return createOptionItem(questionOption);
                })}
            </>
          )}
        </div>
      </form>
    </div>
  );
};
export default ViewSysQuestion;
