import Select from "react-select";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";
import { MdDriveFolderUpload } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([
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
  ]);

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
  const handleSubmitQuestionForQuiz = () => {
    console.log(questions);
  };

  return (
    <div className="questions-container px-2">
      <h2 className="mb-3">Manage Question</h2>
      <h6>Select Quiz:</h6>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
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
                    {question.imageName
                      ? question.imageName
                      : "0 file uploaded"}
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
    </div>
  );
};

export default Questions;
