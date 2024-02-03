import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import Select from "react-select";
import { putUpdateQuiz } from "../../../../services/apiServices";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

function ModalEditQuiz(props) {
  const { show, setShow, fetchQuiz, dataUpdate, resetUpdateData } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [image, setImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setDifficulty("");
    setImage("");
    setPreviewImg("");
    resetUpdateData();
  };
  const handleUploadImg = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImg(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitEditQuiz = async () => {
    if (!name || !description) {
      toast.error("Name/Description must be fielded");
    }

    let data = await putUpdateQuiz(
      dataUpdate.id,
      description,
      name,
      difficulty?.value,
      image
    );
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setDifficulty(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="xl"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              value={difficulty}
              defaultValue={difficulty}
              onChange={setDifficulty}
              options={options}
              placeholder={difficulty}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitEditQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditQuiz;
