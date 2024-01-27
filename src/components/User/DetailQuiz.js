import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";

const DetailQuiz = (props) => {
  const param = useParams();
  const quizID = param.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizID]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizID);
    console.log(res);
  };

  return <div className="detail-quiz-container">Detail Quiz</div>;
};

export default DetailQuiz;
