import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";

const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <h1>Manage User</h1>
      <section className="user-content">
        <div className="manage-user-buttons">
          <button className="btn btn-primary">Add new user</button>
        </div>
        <section className="table-user">Table user</section>
        <ModalCreateUser></ModalCreateUser>
      </section>
    </div>
  );
};
export default ManageUser;
