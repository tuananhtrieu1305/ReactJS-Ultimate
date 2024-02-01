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
      description: "d1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "a1",
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
                  />
                </FloatingLabel>
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                  className="upload-form"
                >
                  <Form.Label>
                    <MdDriveFolderUpload />
                  </Form.Label>
                  <Form.Control type="file" hidden />
                  <span>abc.png</span>
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
                      <Form.Check type={"checkbox"} />
                      <FloatingLabel
                        controlId="floatingPassword"
                        label={`Answer ${index + 1} 's description`}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Answer"
                          value={answer.description}
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
    </div>
  );
};

export default Questions;
