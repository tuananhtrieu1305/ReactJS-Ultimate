import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import { useTranslation } from "react-i18next";
import ModalDeleteUser from "./ModalDeleteUser";

const ManageUser = (props) => {
  const { t } = useTranslation();
  const LIMIT_USER = 3;

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    fetchListUser(1);
  }, []);

  const fetchListUser = async (page) => {
    let res = await getAllUsers(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
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
    <div className="manage-user-container manage_user_container">
      <h1 className="mb-3 m_heading">{t("manage_user_container.m_heading")}</h1>
      <section className="user-content">
        <div className="manage-user-buttons">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2 m_btn_add"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FaPlusCircle /> {t("manage_user_container.m_btn_add")}
          </button>
        </div>
        <section className="table-user mt-5">
          <TableUser
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUser={fetchListUser}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></TableUser>
        </section>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></ModalCreateUser>
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchListUser={fetchListUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></ModalUpdateUser>
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataUpdate={dataUpdate}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></ModalViewUser>
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          resetDeleteData={resetDeleteData}
          dataDelete={dataDelete}
          fetchListUser={fetchListUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></ModalDeleteUser>
      </section>
    </div>
  );
};
export default ManageUser;
