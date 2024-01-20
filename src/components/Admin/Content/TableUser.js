import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllUsers } from "../../../services/apiServices";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchListUser();
  }, []);

  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">NO</th>
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
                  <td className="text-center">{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td className="text-center">{item.role}</td>
                  <td className="text-center">
                    <button className="btn btn-success">View</button>
                    <button className="btn btn-danger mx-2">Delete</button>
                    <button className="btn btn-warning">Update</button>
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
