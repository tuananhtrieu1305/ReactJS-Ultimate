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
import {
  FaTachometerAlt,
  FaGem,
  FaGithub,
  FaRegLaughWink,
} from "react-icons/fa";
import sidebarBg from "../../assets/images/sidebarbg.jpg";
import logo from "../../assets/images/logo.svg";

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
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
            className="navbar-brand d-flex align-items-center justify-content-center"
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
                padding: "24px 24px 24px 0",
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
            <MenuItem
              icon={<FaTachometerAlt />}
              suffix={<span className="badge red">New</span>}
            >
              dashboard
            </MenuItem>
            <MenuItem icon={<FaGem />}> components </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">3</span>}
              icon={<FaRegLaughWink />}
            >
              <MenuItem> 1</MenuItem>
              <MenuItem> 2</MenuItem>
              <MenuItem> 3</MenuItem>
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
              >
                Help?
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
