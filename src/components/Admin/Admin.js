import SideBar from "./SideBar";
import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Nav from "react-bootstrap/Nav";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";
import { postLogout } from "../../services/apiServices";
import NavDropdown from "react-bootstrap/NavDropdown";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Admin = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);

  const handleLogout = async () => {
    let res = await postLogout("account.email", account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/");
    } else {
      toast.error(res.EM);
      return;
    }
  };

  return (
    <div className="admin-container admin">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <PerfectScrollbar>
          <div className="admin-header">
            <span onClick={() => setCollapsed(!collapsed)}>
              <FaBars size={"1.5em"} />
            </span>
            <Navbar>
              <Navbar className="right_header">
                <NavDropdown
                  title={i18n.language === "vi" ? "Cài đặt" : "Settings"}
                  id="basic-nav-dropdown"
                  className="mx-4"
                >
                  <NavDropdown.Item className="profile">
                    {t("right_header.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleLogout()}
                    className="logout"
                  >
                    {t("right_header.logout")}
                  </NavDropdown.Item>
                </NavDropdown>
                <Language></Language>
              </Navbar>
            </Navbar>
          </div>
          <div className="admin-main">
            <Outlet></Outlet>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Admin;
