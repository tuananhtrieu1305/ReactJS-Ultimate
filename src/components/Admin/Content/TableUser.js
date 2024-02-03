import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";

const TableUser = (props) => {
  const { t } = useTranslation();
  const {
    listUser,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchListUser,
    pageCount,
    setCurrentPage,
    currentPage,
  } = props;

  const handlePageClick = (event) => {
    fetchListUser(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center table_id">
              {t("manage_user_container.table_id")}
            </th>
            <th className="table_username">
              {t("manage_user_container.table_username")}
            </th>
            <th className="table_email">
              {t("manage_user_container.table_email")}
            </th>
            <th className="text-center table_role">
              {t("manage_user_container.table_role")}
            </th>
            <th className="text-center table_action">
              {t("manage_user_container.table_action")}
            </th>
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
                      className="btn btn-success table_btn_view"
                      onClick={() => handleClickBtnView(item)}
                    >
                      {t("manage_user_container.table_btn_view")}
                    </button>
                    <button
                      className="btn btn-warning mx-2 table_btn_update"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      {t("manage_user_container.table_btn_update")}
                    </button>
                    <button
                      className="btn btn-danger table_btn_delete"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      {t("manage_user_container.table_btn_delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center table_not_found">
                {t("manage_user_container.table_not_found")}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-center mt-4">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUser;
