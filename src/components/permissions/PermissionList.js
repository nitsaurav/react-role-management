import React, { useEffect, useState } from "react";
import getPermissionsMasterData from "../../services/permissions/permissionMasterData";

const PermissionList = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    setPermissions(getPermissionsMasterData);
  }, [setPermissions]);

  return (
    <>
      <h2>Permission Lists</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
            </tr>
          ))}

          {permissions.length === 0 && (
            <tr>
              <td colSpan={5} className="text-danger">
                No Data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PermissionList;
