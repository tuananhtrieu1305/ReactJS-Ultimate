import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizForAdmin,
  getAllUsersWithoutPaginate,
  postAssignQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUsersWithoutPaginate();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUser(newUser);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);
  useEffect(() => {
    fetchQuiz();
  }, [selectedOption]);

  const handleAssignQuiz = async () => {
    let res = await postAssignQuiz(selectedOption.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="assign-quiz-container">
      <div className="row">
        <div className="col-6">
          <h6>Select Quiz:</h6>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={listQuiz}
            placeholder={""}
          />
        </div>
        <div className="col-6">
          <h6>Select User:</h6>
          <Select
            defaultValue={selectedUser}
            onChange={setSelectedUser}
            options={listUser}
            placeholder={""}
          />
        </div>
      </div>
      <button
        className="btn btn-success mt-3"
        onClick={() => handleAssignQuiz()}
      >
        Assign
      </button>
    </div>
  );
};

export default AssignQuiz;
