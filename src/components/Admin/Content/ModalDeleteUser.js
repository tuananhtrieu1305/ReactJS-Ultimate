import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDeleteUser(props) {
  const { show, setShow, dataDelete, resetDeleteData } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = () => [alert("me")];

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete{" "}
          <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
