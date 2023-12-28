import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
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
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            <button className="btn btn-outline-dark">Log in</button>
            <button className="btn btn-dark mx-3">Sign up</button>
            {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Log out</NavDropdown.Item>
              <NavDropdown.Item>Profiles</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
