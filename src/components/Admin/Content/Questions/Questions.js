import Select from "react-select";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsTrash } from "react-icons/bs";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Questions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="questions-container px-2">
      <h2 className="mb-3">Manage Question</h2>
      <h6>Select Quiz:</h6>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <h6 className="mt-3">Add question:</h6>
      <div>
        <section className="question-content">
          <FloatingLabel controlId="floatingPassword" label="Description">
            <Form.Control type="text" placeholder="Description" />
          </FloatingLabel>
          <Form.Group
            controlId="exampleForm.ControlInput1"
            className="upload-form"
          >
            <Form.Label>Upload image</Form.Label>
            <Form.Control type="file" hidden />
            <span>abc.png</span>
          </Form.Group>
          <div className="action">
            <div>
              <IoAddCircleOutline />
            </div>
            <div>
              <BsTrash />
            </div>
          </div>
        </section>
        <section className="answer-content">
          <Form.Check type={"checkbox"} />
          <FloatingLabel controlId="floatingPassword" label="Answer">
            <Form.Control type="text" placeholder="Answer" />
          </FloatingLabel>
          <div className="action">
            <div>
              <IoAddCircleOutline />
            </div>
            <div>
              <BsTrash />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Questions;
