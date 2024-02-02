import Timer from "./Timer";

const QuizControl = (props) => {
  const { dataQuiz, handleFinish } = props;
  const isTimeUp = () => {
    handleFinish();
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
            return <div className="question">{index + 1}</div>;
          })}
      </section>
    </>
  );
};

export default QuizControl;
