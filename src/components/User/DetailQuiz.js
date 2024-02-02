import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import QuizControl from "./QuizControl/QuizControl";

const DetailQuiz = (props) => {
  const param = useParams();
  const quizID = param.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizID]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizID);

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
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionID: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    } else {
      setIndex(index - 1);
    }
  };
  const handleFinish = async () => {
    let payload = {
      quizId: +quizID,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionID;
        let userAnswerId = [];
        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      let res = await postSubmitQuiz(payload);
      console.log(res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("Something wrong");
      }
    }
  };
  const handleCheckbox = (answerId, questionID) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionID === +questionID
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }
    let index = dataQuizClone.findIndex(
      (item) => +item.questionID === +questionID
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <div className="detail-quiz-container container">
      <section className="left-content">
        <h1>
          Quiz {quizID}: {location?.state?.questionTitle}
        </h1>
        <hr />
        <Question
          index={index}
          handleCheckbox={handleCheckbox}
          data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
        ></Question>
        <div className="button-group">
          <button
            className="btn btn-outline-success"
            onClick={() => handlePrev()}
          >
            Prev
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => handleNext()}
          >
            Next
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleFinish()}
          >
            Finish
          </button>
        </div>
      </section>
      <section className="right-content">
        <QuizControl
          dataQuiz={dataQuiz}
          handleFinish={handleFinish}
        ></QuizControl>
      </section>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
      ></ModalResult>
    </div>
  );
};

export default DetailQuiz;
