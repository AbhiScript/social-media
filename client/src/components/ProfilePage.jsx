import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import styles from "../styles/ProfilePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PostList from "./profileComponents/PostList";

function ProfilePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  function logout() {
    localStorage.setItem("token", "");
    navigate("/");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          className={`col-md-3 col-lg-2 d-md-block bg-dark sidebar ${styles.fullHeight}`}
        >
          <div className="position-sticky pt-3">
            <a
              href="#"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <svg className="bi pe-none me-2" width="40" height="32">
                <use xlinkHref="#bootstrap"></use>
              </svg>
              <span className="fs-4">Card Actions</span>
            </a>
            <hr />
            <ul className="nav flex-column">
              <li className="nav-item">
                <a href="#" className="nav-link active" aria-current="page">
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#home"></use>
                  </svg>
                  Add new Card
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#speedometer2"></use>
                  </svg>
                  Edit this Card
                </a>
              </li>
              <li>
                <a href="#" className="nav-link text-white">
                  <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#table"></use>
                  </svg>
                  Delete this Card
                </a>
              </li>
            </ul>
            <hr />
          </div>
        </nav>

        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="px-3 py-2 border-bottom mb-3">
            <div className="container d-flex flex-wrap justify-content-center">
              <div className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
                <h2>Profile Page</h2>
              </div>
              <div className="text-end">
                <Button variant="danger" onClick={handleShow}>
                  <LuLogOut /> &nbsp; Log-out
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Body>Are you sure you want to log-out?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={logout}>
                      Yes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
          <PostList />
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
