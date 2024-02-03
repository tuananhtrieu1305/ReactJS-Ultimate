import { useEffect } from "react";
import Table from "react-bootstrap/Table";

const TableQuiz = (props) => {
  const { listQuiz, fetchQuiz, handleClickBtnUpdate, handleClickBtnDelete } =
    props;

  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th className="text-center">TYPE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td className="text-center">{item.difficulty}</td>
                  <td className="d-flex justify-content-center align-items-center gap-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listQuiz && listQuiz.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                Not found data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default TableQuiz;
