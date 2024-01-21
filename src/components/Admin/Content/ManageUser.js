import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

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
  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleClickBtnView = (user) => {
    setShowModalViewUser(true);
    setDataUpdate(user);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };
  const resetDeleteData = () => {
    setDataDelete({});
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
          <TableUser
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          ></TableUser>
        </section>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        ></ModalCreateUser>
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
        ></ModalUpdateUser>
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
        ></ModalViewUser>
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          resetDeleteData={resetDeleteData}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
        ></ModalDeleteUser>
      </section>
    </div>
  );
};
export default ManageUser;
