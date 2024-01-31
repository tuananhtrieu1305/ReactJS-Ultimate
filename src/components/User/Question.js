import _ from "lodash";
import Form from "react-bootstrap/Form";

const Question = (props) => {
  const { data, index, handleCheckbox } = props;
  const handleClickCheckbox = (event, aId, qId) => {
    // console.log(event.target.checked);
    handleCheckbox(aId, qId);
  };

  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      <figure>
        {data.image ? (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="" />
        ) : (
          <span>NO IMAGE</span>
        )}
      </figure>
      <div className="question-content">
        <h4 className="question-title text-center">
          Question {index + 1}: {data.questionDescription} ?
        </h4>
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="answer">
                <Form.Check
                  type={"checkbox"}
                  label={a.description}
                  checked={a.isSelected}
                  onChange={(event) =>
                    handleClickCheckbox(event, a.id, data.questionID)
                  }
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
