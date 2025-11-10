import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Registration.css'; // Import your CSS file
import ProgressBar from 'react-bootstrap/ProgressBar';
import {
  getUserByUsername,
  //getSysSteps,
  getUserSteps,
  //getAllSysStepQuestionLinkages,
  //getAllSysQuestions,
  //getAllUserAnswers,
  //getSysQuestionOptions,
  //updateUserAnswersByStep,
} from '../../api/registerAPI';

const Registration = () => {
  const [username, setUsername] = useState('');
  //const [registerid, setRegisterID] = useState(0);
  const [viewStepSeq, setViewStepSeq] = useState(1);
  //const [sysStepList, setSysStepList] = useState([]);
  //const [sysStepQuestionList, setSysStepQuestionList] = useState([]);
  //const [sysQuestionList, setSysQuestionList] = useState([]);
  //const [sysQuestionOptionList, setSysQuestionOptionList] = useState([]);
  const [userStepList, setUserStepList] = useState([]);
  //const [userAnswerList, setUserAnswerList] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [completePercent, setCompletePercent] = useState(0.0);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    var username_local = localStorage.getItem('username');
    var token_local = localStorage.getItem('access_token');
    if(username_local && token_local) {
      //--- Do Nothing ---//
    }
    else
    {
      window.location.href = "/home";
    }
    if (username_local != null) {
      setUsername(username_local);
    }
    
    const loadUserSteps = async (username_load) => {
      try {
        var registerUser = await getUserByUsername(username_load);
        if (registerUser != null) {
          localStorage.setItem("registerid", registerUser.register_id);
          /*
          
          var webSysStepList = await getSysSteps();
          webSysStepList = webSysStepList.sort(
            (a, b) => a.question_seq - b.question_seq
          );
          setSysStepList(webSysStepList);
          console.log('setSysStepList', webSysStepList);
          var webSysStepLinkageList = await getAllSysStepQuestionLinkages();
          setSysStepQuestionList(webSysStepLinkageList);
          var webSysQuestionList = await getAllSysQuestions();
          setSysQuestionList(webSysQuestionList);
          var webSysQuestionOptionList = await getSysQuestionOptions();
          //console.log('webSysQuestionOptionList', webSysQuestionOptionList);
          setSysQuestionOptionList(webSysQuestionOptionList);
          */
          var webUserStepList = await getUserSteps(registerUser.register_id);
          //console.log('webUserStepList', webUserStepList);
          webUserStepList = webUserStepList.sort(
            (a, b) => a.step_seq - b.step_seq
          );

          var maxViewStep = 1;
          webUserStepList.forEach((sysStep) => {
            var userStep = webUserStepList.find(
              (us) => us.step_id == sysStep.step_id
            );
            if (userStep == null) {
              webUserStepList.push({
                register_id: registerUser.register_id,
                step_id: sysStep.step_id,
                submitted: false,
                completed: false,
                approved: false,
              });
            } else {
              if (userStep.completed) {
                maxViewStep = sysStep.step_seq + 1;
              }
            }
          });
          setUserStepList(webUserStepList);
          setViewStepSeq(maxViewStep);
          setCompletePercent(
            getPercentage(
              webUserStepList.filter((m) => m.completed == true).length,
              webUserStepList.length
            )
          );
        }
      } catch (error) {
        setErrorMsg(error);
        setShowErrorMsg(true);
      }
    };
    loadUserSteps(username_local);
    //var webUserStepList = getUserSteps(username_local);
    //console.log(webUserStepList);
  }, []);
  const getPercentage = (part, total) => {
    if (total === 0) {
      return 0; // Or handle as an error, depending on desired behavior for division by zero
    }
    return (part / total) * 100;
  };
  const createStepCard = (userStep) => {
    if (userStep.step_seq <= viewStepSeq) {
      userStep.can_view = true;
    } else {
      userStep.can_view = false;
    }
    return (
      <div className={'col'} key={'step_card_key_' + userStep.step_id}>
        <div className="card h-100">
          <div className={'card-body'}>
            {userStep.can_view ? (
              <div>
                <h5
                  className={'card-title card-title-fixed-height'}
                  style={{ backgroundColor: 'var(--bs-success-bg-subtle)' }}
                >
                  第{userStep.step_seq}步.<br/>{userStep.step_subject}
                </h5>
                <p className={'card-text'}>{userStep.step_description}</p>
                <button
                  type="button"
                  className={'btn btn-primary'}
                  //data-bs-toggle="modal"
                  //data-bs-target={'#view_user_step_question_modal_' + userStep.step_id }
                  onClick={() => ViewStep(userStep.step_id)}
                >
                  查看具体内容
                </button>
                <div>
                  {/*
                  <div
                    className={'modal fade'}
                    id={'view_user_step_question_modal_' + userStep.step_id}
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            第{userStep.step_seq}步.{userStep.step_subject}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form>
                            {sysStepQuestionList
                              .filter(linkage => linkage.step_id == userStep.step_id)
                              .sort((a, b) => a.question_seq - b.question_seq)
                              .map((sysStepQuestion) => {
                                var userAnswer = userAnswerList.find(
                                  (ua) => ua.question_id == sysStepQuestion.question_id
                                );
                                return createQuestionFormElement(
                                  sysStepQuestion,
                                  sysStepQuestion.question,
                                  [],
                                  userAnswer
                                );
                              })}
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              saveUserAnswers(
                                userStep.step_id,
                                userStep.user_step_id
                              )
                            }
                          >
                            Save Answers
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              submitUserAnswers(
                                userStep.step_id,
                                userStep.user_step_id
                              )
                            }
                          >
                            Submit Answers
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close & Disgard Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  */}
                </div>
                <div>
                  已提交{' '}
                  <input
                    type="checkbox"
                    checked={userStep.submitted} // The 'checked' prop links the checkbox to the state
                    disabled={true}
                  />
                </div>
                <div>
                  已通过{' '}
                  <input
                    type="checkbox"
                    checked={userStep.approved} // The 'checked' prop links the checkbox to the state
                    disabled={true}
                  />
                </div>
                <div>
                  已完成{' '}
                  <input
                    type="checkbox"
                    checked={userStep.completed} // The 'checked' prop links the checkbox to the state
                    disabled={true}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h5
                  className={'card-title card-title-fixed-height'}
                  style={{ backgroundColor: 'var(--bs-danger-bg-subtle)'}}
                >
                  第{userStep.step_seq}步.<br/>{userStep.step_subject}
                </h5>
                <p>提交上一步后可查看</p>
              </div>
            )}
          </div>
        </div>
        {
          (userStep.step_seq%3==0)?<br/>:<></>
        }
      </div>
    );
  };
  const ViewStep = async (stepid) => {
    navigate('/regstep', { state: { stepid: stepid} });
    //window.location.href = "/regstep";
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
              <div className={'col-md-3 text-center'}>百里认一新用户注册</div>
              <div className={'col-md-3'}></div>
            </div>
          </div>
        </div>
      </nav>
      <label>
        { viewStepSeq == 1 ? 
        'Hi ' + username + ', 你当前还未提交报名表。' : 
        'Hi ' + username + ', 你目前已经完成了第' + (viewStepSeq-1).toString() + '步。'}
      </label>
      <br />
      {showErrorMsg ? (
        <>
          <label>{'Issue: ' + errorMsg}</label>
          <br />
        </>
      ) : (
        <></>
      )}
      <ProgressBar className={'progress'} now={completePercent} max={100} label={'Completed %'} 
      style={{ width: completePercent.toString() + '%' }}
      />
      {/*<div
        className={'progress'}
        role="progressbar"
        aria-label="Animated striped example"
        aria-valuenow={completePercent.toString()}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className={'progress-bar progress-bar-striped progress-bar-animated'}
          style={{ width: completePercent.toString() + '%' }}
        ></div>
      </div>*/}
      <br />
      <div className={'container'}>
        <div className={'row'}>
          {userStepList
            .sort((a, b) => a.step_seq - b.step_seq)
            .map((userStep) => {
              //console.log('userStep:container', userStep)
              return createStepCard(userStep);
            })}
        </div>
      </div>
    </div>
  );
};

export default Registration;
