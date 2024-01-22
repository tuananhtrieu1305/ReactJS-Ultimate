import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars size={"1.5em"} onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div className="admin-main">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
export default Admin;
