import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function Profile({ userData }) {
  const [name, setName] = useState(userData.name);
  const [password, setPassword] = useState(userData.password);
  const [disableAccount, setDisableAccount] = useState(userData.ActiveStatus);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleDisableAccount = () => setDisableAccount(!disableAccount);

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmation(true);
  };

  const handleConfirm = () => {
    fetch("http://localhost:7700/editProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name,
        password,
        disableAccount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="container mt-5">
        <h3>Profile</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={userData.email} readOnly />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group controlId="formDisableAccount">
            <Form.Check
              type="switch"
              label="Disable Account"
              checked={disableAccount}
              onChange={handleDisableAccount}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to save these changes ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
