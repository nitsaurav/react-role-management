import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import getRolePermissionsData from "../../services/roles/rolePermissionsData";
import Modal from "react-bootstrap/Modal";
import AddRole from "./AddRole";
import EditRole from "./EditRole";

const RoleList = () => {
  const [roles, setRoles] = useState({
    rolesDataAll: []
  });

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState("");
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleEditModal = () => setShowEditModal(true);

  const addRole = () => {};

  useEffect(() => {
    let roleData = { ...roles };
    roleData.rolesDataAll = getRolePermissionsData();
    setRoles(roleData);
  }, [setRoles]);

  const editRole = item => {
    setEditData(item);
    handleEditModal();
  };

  const deleteRole = index => {
    const roleData = { ...roles };
    // Call an external api or make a service call
    roleData.rolesDataAll.splice(index, 1);
    setRoles(roleData);
    toast.error("Role Deleted !", {
      position: toast.POSITION.RIGHT_CENTER
    });
  };

  const onSubmitAddRole = data => {
    const roleData = { ...roles };
    roleData.rolesDataAll.unshift(data);
    setRoles(roleData);
    setShowModal(false);
    toast.success("Congratulation, Role Added !", {
      position: toast.POSITION.RIGHT_CENTER
    });
  };

  const onSubmitEditRole = data => {
    const roleData = { ...roles };

    for (let index = 0; index < roleData.rolesDataAll.length; index++) {
      if (roleData.rolesDataAll[index].id === data.id) {
        roleData.rolesDataAll[index] = data;
      }
    }

    setRoles(roleData);
    setShowEditModal(false);
    toast.success("Congratulation, Role Edited !", {
      position: toast.POSITION.RIGHT_CENTER
    });
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="float-left">
          {" "}
          <h2>Role Lists</h2>
        </div>
        <div className="float-right">
          <button className="btn btn-success" onClick={handleShowModal}>
            {" "}
            + New Role
          </button>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Permissions</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {roles.rolesDataAll.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>
                {item.permissions.map((permission, index2) => (
                  <span className="badge badge-default" key={index2}>
                    {" "}
                    {permission.name}{" "}
                  </span>
                ))}
              </td>
              <td>
                <button
                  className="btn btn-success mr-2"
                  onClick={() => editRole(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteRole(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {roles.rolesDataAll.length === 0 && (
            <tr>
              <td colSpan={5} className="text-danger">
                No Data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        animation={true}
        centered
      >
        <AddRole onSubmit={onSubmitAddRole} onClose={handleCloseModal} />
      </Modal>

      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        animation={true}
        centered
      >
        <EditRole
          role={editData}
          onSubmitEdit={onSubmitEditRole}
          onCloseEdit={handleCloseEditModal}
        />
      </Modal>
    </>
  );
};

export default RoleList;
