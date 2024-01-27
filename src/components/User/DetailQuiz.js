import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import _ from "lodash";

const DetailQuiz = (props) => {
  const param = useParams();
  const quizID = param.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizID]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizID);
    console.log(res);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            answers.push(item.answers);
          });
          return { questionID: key, answers, questionDescription, image };
        })
        .value();
      console.log(data);
    }
  };

  return <div className="detail-quiz-container">Detail Quiz</div>;
};

export default DetailQuiz;
