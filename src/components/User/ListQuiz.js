import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <Card key={`${index}-quiz`} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${quiz.image}`}
              />
              <Card.Body className="card_question">
                <Card.Title className="card_title">
                  {t("card_question.card_title")} {index + 1}
                </Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Button
                  className="card_btn"
                  variant="primary"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { questionTitle: quiz.description },
                    })
                  }
                >
                  {t("card_question.card_btn")}
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && (
        <div>You don't have any quiz now ....</div>
      )}
    </div>
  );
};

export default ListQuiz;
