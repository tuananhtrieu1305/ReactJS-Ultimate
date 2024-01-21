import Table from "react-bootstrap/Table";

const TableUser = (props) => {
  const { listUser, handleClickBtnUpdate, handleClickBtnView } = props;

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th className="text-center">ROLE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td className="text-center">{item.role}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-success"
                      onClick={() => handleClickBtnView(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
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

export default TableUser;
