import React from "react";
import Navbar_Admin from "../../Components/Admin/Navbar_Admin";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UserDatabase from "../../Fuctions/Admin/UserDatabase";

const User_Database = () => {
  const { userData, updateClicked, handleDelete } = UserDatabase();

  return (
    <div>
      <Navbar_Admin />
      <div className="container mt-5 pt-5 ">
        <h1 className="text-center mb-5">User Database</h1>
        <div className="row table-responsive" >
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table className="table table-hover table-bordered">
              <thead className="text-center">
                <tr>
                  <th scope="col">Sl no.</th>
                  <th scope="col">Library ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Membership</th>
                  <th scope="col">Actions</th>
                  {/* premium view book requests,delete,comment edit and delete, */}
                </tr>
              </thead>
              <tbody >
                {userData.map((userDetails, key) => (
                  <tr key={key} className="text-center">
                    <th scope="row">{key + 1}</th>
                    <td>{userDetails._id}</td>
                    <td>{userDetails.name}</td>

                    <td>{userDetails.email}</td>
                    <td>{userDetails.role}</td>
                    <td>
                      <Tooltip title="Manage">
                        <IconButton
                          onClick={() => {
                            updateClicked(userDetails._id);
                          }}
                        >
                          <ManageAccountsIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(userDetails._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Database;
