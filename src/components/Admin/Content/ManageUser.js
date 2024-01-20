import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

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
        <section className="table-user">Table user</section>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        ></ModalCreateUser>
      </section>
    </div>
  );
};
export default ManageUser;
