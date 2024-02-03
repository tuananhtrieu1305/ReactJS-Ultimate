import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal";

function ModalResult(props) {
  const { t } = useTranslation();
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="quiz_result_header">
            {t("detail_quiz_container.quiz_result_header")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="quiz_result_question">
            {t("detail_quiz_container.quiz_result_question")}:{" "}
            <b>{dataModalResult.countTotal}</b>
          </div>
          <div className="quiz_result_answer">
            {t("detail_quiz_container.quiz_result_answer")}:{" "}
            <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="quiz_show_btn"
          >
            {t("detail_quiz_container.quiz_show_btn")}
          </Button>
          <Button
            variant="primary"
            onClick={handleClose}
            className="quiz_close_btn"
          >
            {t("detail_quiz_container.quiz_close_btn")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
