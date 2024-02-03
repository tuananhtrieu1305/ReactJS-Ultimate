import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postLogout } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { useTranslation } from "react-i18next";
import Language from "./Language";

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
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
          QuizFun
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav_bar">
            <NavLink to="/" className="nav-link nav_bar_link1">
              {t("nav_bar.nav_bar_link1")}
            </NavLink>
            <NavLink to="/users" className="nav-link nav_bar_link2">
              {t("nav_bar.nav_bar_link2")}
            </NavLink>
            <NavLink to="/admins" className="nav-link nav_bar_link3">
              {t("nav_bar.nav_bar_link3")}
            </NavLink>
          </Nav>
          <Nav className="right_header">
            {isAuthenticated === false ? (
              <>
                <button
                  className="btn btn-outline-dark login"
                  onClick={() => handleLogin()}
                >
                  {t("right_header.login")}
                </button>
                <button
                  className="btn btn-dark mx-3 signup"
                  onClick={() => handleSignup()}
                >
                  {t("right_header.signup")}
                </button>
              </>
            ) : (
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
            )}
            <Language></Language>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
