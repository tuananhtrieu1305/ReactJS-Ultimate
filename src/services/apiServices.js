import axios from "../utils/apiCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const getAllUsers = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const getAllUsersWithoutPaginate = () => {
  return axios.get(`api/v1/participant/all`);
};
const deleteUser = (userID) => {
  return axios.delete("api/v1/participant", { data: { id: userID } });
};
const postLogin = (email, password) => {
  return axios.post("api/v1/login", { email, password, delay: 3000 });
};
const postSignup = (email, username, password) => {
  return axios.post("api/v1/register", { email, username, password });
};
const getQuizByUser = () => {
  return axios.get("api/v1/quiz-by-participant");
};
const getDataQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
const postSubmitQuiz = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};
const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("api/v1/quiz", data);
};
const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};
const putUpdateQuiz = (id, description, name, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.put("api/v1/quiz", data);
};
const deleteQuiz = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};
const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image);
  return axios.post("api/v1/question", data);
};
const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const getQuizWithQA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};
const postLogout = (email, refresh_token) => {
  return axios.post(`api/v1/logout`, { email, refresh_token });
};
const getOverview = () => {
  return axios.get(`api/v1/overview`);
};

export {
  postCreateNewUser,
  postAssignQuiz,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  postLogin,
  postSignup,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  getAllUsersWithoutPaginate,
  getQuizWithQA,
  postUpsertQA,
  postLogout,
  getOverview,
};
