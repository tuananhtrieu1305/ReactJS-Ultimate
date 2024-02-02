import Select from "react-select";
import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import { MdDriveFolderUpload } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestion,
  getQuizWithQA,
  postCreateNewQuestionForQuiz,
  postUpsertQA,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import _ from "lodash";

const QuizQA = () => {
  const initQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];

  const [selectedOption, setSelectedOption] = useState({});
  const [questions, setQuestions] = useState(initQuestion);
  const [isPreviewImg, setIsPreviewImg] = useState(false);
  const [dataPreviewImg, setDataPreviewImg] = useState({
    title: "",
    url: "",
  });
  const [listQuiz, setListQuiz] = useState([]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers.push(newAnswer);
      setQuestions(questionClone);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionId);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(questionClone);
    }
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuestions(questionClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionClone[index].imageFile = event.target.files[0];
      questionClone[index].imageName = event.target.files[0].name;
      setQuestions(questionClone);
    }
  };
  const handleKeyAnswer = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }
            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionClone);
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    // Todo
    // Validate data
    if (_.isEmpty(selectedOption)) {
      toast.error("Please choose a quiz!");
      return;
    }
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
        indexQ = i;
        if (isValidAnswer === false) {
          break;
        }
      }
    }
    if (isValidAnswer === false) {
      toast.error(
        `Answer ${indexA + 1} at question ${indexQ + 1} must be fielded`
      );
      return;
    }

    let isValidQuestion = true;
    let indexQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion = i;
        break;
      }
    }
    if (isValidQuestion === false) {
      toast.error(
        `Description of question ${indexQuestion + 1} must be fielded`
      );
      return;
    }
    // Submit questions
    let questionClone = _.clone(questions);
    for (let i = 0; i < questionClone.length; i++) {
      if (questionClone[i].imageFile) {
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile);
      }
    }
    let res = await postUpsertQA({
      quizId: selectedOption.value,
      questions: questionClone,
    });
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const handlePreviewImg = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataPreviewImg({
        title: questionClone[index].imageName,
        url: URL.createObjectURL(questionClone[index].imageFile),
      });
      setIsPreviewImg(true);
    }
  };
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  // return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedOption.value);
    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  useEffect(() => {
    if (selectedOption && selectedOption.value) {
      fetchQuizWithQA();
    }
  }, [selectedOption]);

  return (
    <div className="questions-container px-2">
      <h6>Select Quiz:</h6>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={listQuiz}
        placeholder={""}
      />
      <h6 className="mt-3">Add question:</h6>
      {questions &&
        questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div key={question.id} className="mb-4">
              <section className="question-content">
                <FloatingLabel
                  controlId="floatingPassword"
                  label={`Question ${index + 1} 's description`}
                >
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    value={question.description}
                    onChange={(event) =>
                      handleOnChange(
                        "QUESTION",
                        question.id,
                        event.target.value
                      )
                    }
                  />
                </FloatingLabel>
                <Form.Group className="upload-form">
                  <Form.Label htmlFor={`${question.id}`}>
                    <MdDriveFolderUpload />
                  </Form.Label>
                  <Form.Control
                    id={`${question.id}`}
                    type="file"
                    hidden
                    onChange={(event) =>
                      handleOnChangeFileQuestion(question.id, event)
                    }
                  />
                  <span>
                    {question.imageName ? (
                      <span onClick={() => handlePreviewImg(question.id)}>
                        question.imageName
                      </span>
                    ) : (
                      "0 file uploaded"
                    )}
                  </span>
                </Form.Group>
                <div className="action">
                  <div
                    className="add"
                    onClick={() => handleAddRemoveQuestion("ADD", "")}
                  >
                    <IoAddCircleOutline />
                  </div>
                  {questions.length > 1 && (
                    <div
                      className="remove"
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question.id)
                      }
                    >
                      <BsTrash />
                    </div>
                  )}
                </div>
              </section>
              {question.answers &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => {
                  return (
                    <section key={answer.id} className="answer-content">
                      <Form.Check
                        type={"checkbox"}
                        checked={answer.isCorrect}
                        onChange={(event) =>
                          handleKeyAnswer(
                            "CHECKBOX",
                            answer.id,
                            question.id,
                            event.target.checked
                          )
                        }
                      />
                      <FloatingLabel
                        label={`Answer ${index + 1} 's description`}
                      >
                        <Form.Control
                          type={"text"}
                          placeholder="Answer"
                          value={answer.description}
                          onChange={(event) =>
                            handleKeyAnswer(
                              "INPUT",
                              answer.id,
                              question.id,
                              event.target.value
                            )
                          }
                        />
                      </FloatingLabel>
                      <div className="action">
                        <div
                          className="add"
                          onClick={() =>
                            handleAddRemoveAnswer("ADD", question.id)
                          }
                        >
                          <IoAddCircleOutline />
                        </div>
                        {question.answers.length > 1 && (
                          <div
                            className="remove"
                            onClick={() =>
                              handleAddRemoveAnswer(
                                "REMOVE",
                                question.id,
                                answer.id
                              )
                            }
                          >
                            <BsTrash />
                          </div>
                        )}
                      </div>
                    </section>
                  );
                })}
            </div>
          );
        })}
      {questions && questions.length > 0 && (
        <button
          className="btn btn-success"
          onClick={() => handleSubmitQuestionForQuiz()}
        >
          Save Question
        </button>
      )}
      {isPreviewImg === true && (
        <Lightbox
          image={dataPreviewImg.url}
          title={dataPreviewImg.title}
          onClose={() => setIsPreviewImg(false)}
        ></Lightbox>
      )}
    </div>
  );
};

export default QuizQA;
