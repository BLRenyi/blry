// These APIs are for Token-based Authenication
//
// See https://www.okta.com/identity-101/what-is-token-based-authentication/
// for more details about Token-based Authenication.

import axios from 'axios';

const AUTH_BASE_URL = "http://localhost:8000/api/reg";

export const getUserByUsername = async (username) => {
  try {
    //console.log('username', username);
    if(username)
    {
      var formData = new FormData();
      formData.append('username', username);
      console.log('getUserByUsername', username)
      const response = await axios.post(`${AUTH_BASE_URL}/getuserbyusername`, formData);
      return response.data;
    }
  } catch (error) {
    console.error("Failed to get user info:", error.response?.data || error.message);
    throw error;
  }
};
/*
export const getAllSysStepQuestionLinkages = async () => {
  try {
    const response = await axios.get(`${AUTH_BASE_URL}/getallsysstepquestion`)
    return response.data;
  } catch (error) {
    console.error("Failed to get sys steps:", error.response?.data || error.message);
    throw error;
  }
};
export const getAllSysQuestions = async () => {
  try {
    const response = await axios.get(`${AUTH_BASE_URL}/getallsysquestion`)
    //console.log('getallsysquestion: response.data', response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to get all questions:", error.response?.data || error.message);
    throw error;
  }
};
export const getSysStepQuestionLink = async (stepID) => {
  try {
    var formData = new FormData();
    formData.append('stepid', stepID);
    const response = await axios.post(`${AUTH_BASE_URL}/getsysstepquestion`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get sys steps:", error.response?.data || error.message);
    throw error;
  }
};
export const getSysQuestionsByStep = async (stepid) => {
  try {
    var formData = new FormData();
    formData.append('stepid', stepid);
    const response = await axios.post(`${AUTH_BASE_URL}/getsysquestionbystep`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get sys questions:", error.response?.data || error.message);
    throw error;
  }
};
export const getSysQuestionOptions = async () => {
  try {
    const response = await axios.get(`${AUTH_BASE_URL}/getsysquestionoption`)
    return response.data;
  } catch (error) {
    console.error("Failed to get sys questions:", error.response?.data || error.message);
    throw error;
  }
};
export const getAllUserAnswers = async (registerID) => {
  try {
    var formData = new FormData();
    formData.append('registerid', registerID);
    const response = await axios.post(`${AUTH_BASE_URL}/getalluseranswers`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user answers:", error.response?.data || error.message);
    throw error;
  }
};
export const getUserAnswersByStep = async (token, registerID, stepID) => {
  try {
    var formData = new FormData();
    formData.append('token', token);
    formData.append('registerid', registerID);
    formData.append('stepid', stepID);
    const response = await axios.post(`${AUTH_BASE_URL}/getuserstep`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user answers for this step:", error.response?.data || error.message);
    throw error;
  }
};
*/
export const getUserSteps = async (registerID) => {
  try {
    var formData = new FormData();
    formData.append('registerid', registerID);
    const response = await axios.post(`${AUTH_BASE_URL}/getusersteps`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user steps:", error.response?.data || error.message);
    throw error;
  }
};

export const updateUserAnswersByStep = async (stepID, userStepID, registerID, answerList, isSubmit) => {
  try {
    var formData = new FormData();
    formData.append('stepid', stepID);
    if(userStepID == null)
    {
      formData.append('userstepid', '');
    }
    else
    {
      formData.append('userstepid', userStepID);
    }
    formData.append('registerid', registerID);
    formData.append('issubmit', isSubmit);
    formData.append("answers", JSON.stringify(answerList));
    Array.prototype.forEach.call(answerList, (answer) => {
      if(answer.answer_id == null)
      {
        formData.append('answerlist[].answer_id', '');
      }
      else
      {
        formData.append('answerlist[].answer_id', answer.answer_id);
      }
      formData.append('answerlist[].register_id', answer.register_id);
      formData.append('answerlist[].question_id', answer.question_id);
      formData.append('answerlist[].content', answer.content);
      if(answer.addtional_input == null)
      {
        formData.append('answerlist[].addtional_input', '');
      }
      else
      {
        formData.append('answerlist[].addtional_input', answer.addtional_input);
      }
    });
    const response = await axios.post(`${AUTH_BASE_URL}/updateuserstep`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user answers for this step:", error.response?.data || error.message);
    throw error;
  }
};
export const getUserFullStep = async (token, registerID, stepID) => {
  try {
    var formData = new FormData();
    formData.append('token', token);
    formData.append('registerid', registerID);
    formData.append('stepid', stepID);
    const response = await axios.post(`${AUTH_BASE_URL}/getuserfullstep`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user answers for this step:", error.response?.data || error.message);
    throw error;
  }
};