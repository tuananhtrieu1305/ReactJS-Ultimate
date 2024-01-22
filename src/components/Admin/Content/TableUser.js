import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";

const TableUser = (props) => {
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
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                Not found data
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
