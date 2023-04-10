import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import getRoleMasterData from "../../services/roles/roleMasterData";
import getUserData from "../../services/users/userData";

const AssignRole = props => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  const changeUser = e => {
    setUser(e.target.value);
  };

  const changeRole = e => {
    setRole(e.target.value);
  };

  const submitRole = () => {
    if (user === "" || role === "") {
      alert("Please fill all the values");
      return false;
    }

    const userData = JSON.parse(user);
    const roleData = JSON.parse(role);
    const data = {
      id: userData.id,
      username: userData.username,
      name: userData.name,
      password: userData.password,
      role: {
        id: roleData.id,
        name: roleData.name
      }
    };
    props.onSubmit(data);
  };

  useEffect(() => {
    setUsers(getUserData);
    setRoles(getRoleMasterData);
  }, []);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Assign Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="4">
              Select User
            </Form.Label>
            <Col sm="6">
              <select
                className="form-control"
                value={user}
                onChange={changeUser}
                required
              >
                <option value="">Please select a user</option>
                {users.map((item, index) => (
                  <option value={JSON.stringify(item)} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="4">
              Select Role
            </Form.Label>
            <Col sm="6">
              <select
                className="form-control"
                value={role}
                onChange={changeRole}
                required
              >
                <option value="">Please select a role</option>
                {roles.map((item, index) => (
                  <option value={JSON.stringify(item)} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onClose} className="btn btn-danger">
          Cancel
        </button>
        <button onClick={submitRole} className="btn btn-success">
          Save
        </button>
      </Modal.Footer>
    </>
  );
};

export default AssignRole;
