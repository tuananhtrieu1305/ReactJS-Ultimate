import ModalCreateUser from "./ModalCreateUser";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <h1>Manage User</h1>
      <section className="user-content">
        <div className="manage-user-buttons">
          <button className="btn btn-primary">Add new user</button>
        </div>
        <section className="table-user">
          Table user
          <ModalCreateUser></ModalCreateUser>
        </section>
      </section>
    </div>
  );
};
export default ManageUser;
