import { useTranslation } from "react-i18next";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaGithub, FaRegLaughWink } from "react-icons/fa";
import sidebarBg from "../../assets/images/sidebarbg.jpg";
import logo from "../../assets/images/logo.svg";
import "../../App.scss";

const SideBar = (props) => {
  const { t, i18n } = useTranslation();
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <Link
            to="/"
            href="#home"
            className="navbar-brand d-flex align-items-center mx-3 "
          >
            <img
              alt=""
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            <div
              style={{
                padding: "24px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              QuizFun
            </div>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />} className="dashboard_section">
              {t("admin.dashboard_section")}
              <Link to="/admins"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              icon={<FaRegLaughWink />}
              title={i18n.language === "vi" ? "Chức năng" : "Features"}
            >
              <MenuItem className="manage_user_section">
                {t("admin.manage_user_section")}
                <Link to="/admins/manage-users"></Link>
              </MenuItem>
              <MenuItem className="manage_quiz_form_section">
                {t("admin.manage_quiz_form_section")}
                <Link to="/admins/manage-quizzes"></Link>
              </MenuItem>
              <MenuItem className="manage_quiz_section">
                {t("admin.manage_quiz_section")}
                <Link to="/admins/manage-questions"></Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                className="help_link"
              >
                {t("admin.help_link")}?
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
