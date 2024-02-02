import NavDropdown from "react-bootstrap/NavDropdown";

const Language = (props) => {
  return (
    <>
      <NavDropdown title="Languages" id="basic-nav-dropdown2">
        <NavDropdown.Item>Vietnamese</NavDropdown.Item>
        <NavDropdown.Item>English</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
