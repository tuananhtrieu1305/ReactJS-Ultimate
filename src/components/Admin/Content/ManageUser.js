import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

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
    <div className="manage-user-container">
      <h1 className="mb-3">Manage User</h1>
      <section className="user-content">
        <div className="manage-user-buttons">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FaPlusCircle /> Add new user
          </button>
        </div>
        <section className="table-user">
          <TableUser listUser={listUser}></TableUser>
        </section>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        ></ModalCreateUser>
      </section>
    </div>
  );
};
export default ManageUser;
