import Timer from "./Timer";

const QuizControl = (props) => {
  const { dataQuiz, handleFinish, setIndex } = props;
  const isTimeUp = () => {
    handleFinish();
  };
  const getClassQuestion = (index, question) => {
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return "question active";
      } else {
        return "question";
      }
    }
  };

  return (
    <>
      <section className="timer h1 text-center">
        <Timer isTimeUp={isTimeUp}></Timer>
      </section>
      <hr />
      <section className="question-list">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`question-${index}`}
                className={getClassQuestion(index, item)}
                onClick={() => setIndex(index)}
              >
                {index + 1}
              </div>
            );
          })}
      </section>
    </>
  );
};

export default QuizControl;
