import { Navbar, Dropdown, ButtonGroup } from "react-bootstrap";
import { FaHome, FaUserFriends, FaUserAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import PropTypes from "prop-types";
import { useHeaderLogic } from "../store/useHeaderLogic";

function Header({ onChangeForm }) {
  const {
    haveAccount,
    pageStatus,
    isHaveAccountDisabled,
    handleSignInClick,
    goToHome,
    handleClick,
  } = useHeaderLogic(onChangeForm);

  return (
    <Navbar bg="light" expand="lg" className="py-3 mb-3 border-bottom">
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={{ marginLeft: "10px" }}
        onClick={goToHome}
      >
        <FaHome />
      </button>
      <div
        className="container-fluid d-grid gap-3 align-items-center"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            <FaUserFriends /> &nbsp; Switch user
            <svg className="bi me-2" width="40" height="32">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleClick("user")}>
              <FaUserAlt />
              &nbsp; User login/sign-up
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleClick("admin")}>
              <RiAdminFill />
              &nbsp; Admin
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="d-flex align-items-center">
          <Dropdown as={ButtonGroup} style={{ marginLeft: "65rem" }}>
            <Dropdown.Toggle
              variant="danger"
              id="dropdown-basic"
              disabled={isHaveAccountDisabled}
            >
              <MdAccountCircle /> &nbsp; {haveAccount}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleSignInClick}>
                {pageStatus}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
}

Header.propTypes = {
  onChangeForm: PropTypes.func,
};

export default Header;
