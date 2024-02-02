const QuizControl = (props) => {
  const { dataQuiz } = props;

  return (
    <>
      <section className="timer h1 text-center">10:10</section>
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
