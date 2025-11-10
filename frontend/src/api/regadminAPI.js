// These APIs are for Token-based Authenication
//
// See https://www.okta.com/identity-101/what-is-token-based-authentication/
// for more details about Token-based Authenication.

import axios from 'axios';

const AUTH_BASE_URL = "http://localhost:8000/api/regadmin";


export const getUserStepToApprove = async (username, token) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('token', token);
    const response = await axios.post(`${AUTH_BASE_URL}/getsteptoapprove`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user steps:", error.response?.data || error.message);
    throw error;
  }
};
export const approveUserSteps = async (username, stepsToApprove) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append("usersteps", JSON.stringify(stepsToApprove));
    const response = await axios.post(`${AUTH_BASE_URL}/approveuserstep`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user answers for this step:", error.response?.data || error.message);
    throw error;
  }
};
export const rejectUserSteps = async (username, stepsToReject) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append("usersteps", JSON.stringify(stepsToReject));
    //console.log('stepsToReject', stepsToReject);
    const response = await axios.post(`${AUTH_BASE_URL}/rejectuserstep`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user answers for this step:", error.response?.data || error.message);
    throw error;
  }
};
export const getAllSysStep = async (username, token) => {
  try {
    var formData = new FormData();
    formData.append('token', token);
    formData.append('username', username);
    const response = await axios.post(`${AUTH_BASE_URL}/getsyssteps`, formData)
    //console.log('getSysSteps', response);
    return response.data;
  } catch (error) {
    console.error("Failed to get sys steps:", error.response?.data || error.message);
    throw error;
  }
};
export const updateSequenceForSysStep = async (username, sysStepList, token) => {
  try {
    var formData = new FormData();
    formData.append('token', token);
    formData.append('username', username);
    formData.append("syssteplist", JSON.stringify(sysStepList));
    const response = await axios.post(`${AUTH_BASE_URL}/updatestepseq`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get user answers for this step:", error.response?.data || error.message);
    throw error;
  }
};
export const getSysStepDetail = async (username, token, stepID) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('token', token);
    formData.append('stepid', stepID);
    const response = await axios.post(`${AUTH_BASE_URL}/getstepdetail`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get step info:", error.response?.data || error.message);
    throw error;
  }
};
export const updateSysStepDetail = async (username, token, stepID, sysStep, isCreate) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('token', token);
    formData.append('stepid', stepID);
    formData.append("iscreate", isCreate);
    formData.append("sysstep", JSON.stringify(sysStep));
    const response = await axios.post(`${AUTH_BASE_URL}/updatestepdetail`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to update step:", error.response?.data || error.message);
    throw error;
  }
};
export const updateQuestionSequence = async (username, token, stepID, questions) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('token', token);
    formData.append('stepid', stepID);
    formData.append("questions", JSON.stringify(questions));
    const response = await axios.post(`${AUTH_BASE_URL}/updatequesionsequence`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to update step:", error.response?.data || error.message);
    throw error;
  }
};
export const getSysQuestionDetail = async (username, token, questionID) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('token', token);
    formData.append('questionid', questionID);
    const response = await axios.post(`${AUTH_BASE_URL}/getquestiondetail`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to get question info:", error.response?.data || error.message);
    throw error;
  }
};
export const updateSysQuestionDetail = async (
  username, token, stepID, questionID, sysQuestion, isCreate, questionOptions) => {
  try {
    var formData = new FormData();
    formData.append('username', username);
    formData.append('token', token);
    formData.append('stepid', stepID);
    formData.append('questionid', questionID);
    formData.append("iscreate", isCreate);
    formData.append("sysquestion", JSON.stringify(sysQuestion));
    formData.append("questionoptions", JSON.stringify(questionOptions));
    const response = await axios.post(`${AUTH_BASE_URL}/updatequestiondetail`, formData);
    return response.data;
  } catch (error) {
    console.error("Failed to update step:", error.response?.data || error.message);
    throw error;
  }
};
