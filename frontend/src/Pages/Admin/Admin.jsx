import React from "react";
import Navbar_Admin from "../../Components/Admin/Navbar_Admin";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from '@mui/icons-material/Description';
import AdminFunctions from "../../Fuctions/Admin/AdminFunctions";

const Admin = () => {
  const { bookData, handleDelete, updateClicked } = AdminFunctions();
  
  return (
    <div>
      <Navbar_Admin />
      <div className="container mt-5 p-5">
        <h1 className="text-center mb-5">Book List</h1>
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table className="table table-hover table-bordered rounded">
              <thead className="text-center">
                <tr>
                  <th scope="col">Sl no.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Language</th>
                  <th scope="col">Stock count</th>
                  <th scope="col">Price</th>
                  <th scope="col">Purchase count</th>
                  <th scope="col">Renter count</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookData.map((bookDetails, key) => (
                  <tr key={key} className="text-center">
                    <th scope="row">{key + 1}</th>
                    <td>{bookDetails.bookname}</td>
                    <td>{bookDetails.genre}</td>
                    <td>{bookDetails.language}</td>
                    <td>{bookDetails.stock}</td>
                    <td>{bookDetails.price}</td>
                    <td>{bookDetails.bought}</td>
                    <td>{bookDetails.rented}</td>
                    <td>
                      <Tooltip title="Manage" placement="right">
                        <IconButton
                          onClick={() => {
                            updateClicked(bookDetails._id);
                          }}
                        >
                          <DescriptionIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete" placement="right">
                        <IconButton
                          onClick={() => handleDelete(bookDetails._id)}
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

export default Admin;
