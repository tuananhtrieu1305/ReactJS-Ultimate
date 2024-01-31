import "./ManageQuiz.scss";
import Select from "react-select";
import { useState } from "react";
import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../../services/apiServices";

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

  const handleUploadImg = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
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
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Manage Quizzes</h1>
      <hr />
      <section className="add-new-quiz">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new quiz:</legend>
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
      <section className="quiz-detail">Table</section>
    </div>
  );
};

export default ManageQuiz;
