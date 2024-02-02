import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const Question = (props) => {
  const [isPreviewImg, setIsPreviewImg] = useState(false);
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
      {data.image ? (
        <figure>
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            alt=""
            onClick={() => setIsPreviewImg(true)}
          />
          {isPreviewImg === true && (
            <Lightbox
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setIsPreviewImg(false)}
            ></Lightbox>
          )}
        </figure>
      ) : (
        <span className="backup-text">NO IMAGE</span>
      )}
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
