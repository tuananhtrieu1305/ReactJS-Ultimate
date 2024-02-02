import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import TableQuiz from "./TableQuiz";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import Accordion from "react-bootstrap/Accordion";
import ModalEditQuiz from "./ModalEditQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [image, setImage] = useState("");
  const [showModalEditQuiz, setShowModalEditQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [listQuiz, setListQuiz] = useState([]);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  const handleUploadImg = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  const handleClickBtnUpdate = (user) => {
    setShowModalEditQuiz(true);
    setDataUpdate(user);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(user);
  };

  const handleCreateQuiz = async () => {
    if (!name || !description) {
      toast.error("Name/Description must be fielded");
      return;
    }

    let res = await postCreateNewQuiz(
      description,
      name,
      selectedOption?.value,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setSelectedOption("");
      setImage(null);
      fetchQuiz();
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container px-2">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <section className="add-new-quiz">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label htmlFor="floatingPassword">Description</label>
                </div>
                <div className="my-3">
                  <Select
                    value={selectedOption}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Quiz level"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="file-input" className="mb-2">
                    Upload image
                  </label>
                  <input
                    type="file"
                    id="file-input"
                    className="form-control"
                    onChange={(event) => handleUploadImg(event)}
                  />
                </div>
                <div className="img-preview">
                  {previewImg ? (
                    <img src={previewImg} alt="" />
                  ) : (
                    <span className="text-secondary">Preview img</span>
                  )}
                </div>
                <button
                  className="btn btn-success mt-3"
                  onClick={() => handleCreateQuiz()}
                >
                  Save
                </button>
              </fieldset>
            </section>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>List Quizzes</Accordion.Header>
          <Accordion.Body>
            <TableQuiz
              listQuiz={listQuiz}
              fetchQuiz={fetchQuiz}
              handleClickBtnDelete={handleClickBtnDelete}
              handleClickBtnUpdate={handleClickBtnUpdate}
            ></TableQuiz>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
          <Accordion.Body>
            <QuizQA></QuizQA>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Assign to Users</Accordion.Header>
          <Accordion.Body>
            <AssignQuiz></AssignQuiz>
          </Accordion.Body>
        </Accordion.Item>
        <ModalEditQuiz
          show={showModalEditQuiz}
          setShow={setShowModalEditQuiz}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          fetchQuiz={fetchQuiz}
        ></ModalEditQuiz>
        <ModalDeleteQuiz
          show={showModalDeleteQuiz}
          setShow={setShowModalDeleteQuiz}
          dataDelete={dataDelete}
          fetchQuiz={fetchQuiz}
        ></ModalDeleteQuiz>
      </Accordion>
    </div>
  );
};

export default ManageQuiz;
