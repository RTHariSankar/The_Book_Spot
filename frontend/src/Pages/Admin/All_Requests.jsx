import React, { useState, useEffect } from "react";
import Navbar_Admin from "../../Components/Admin/Navbar_Admin";
import axios from "axios";
import { ALL_USERS_API, DELETE_REQUEST_API } from "../../Apis/api";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
const All_Requests = () => {
  let slNo = 1;
  const token = sessionStorage.getItem("token");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${ALL_USERS_API}/${token}`);
      const data = response.data.users;
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteRequest = async (id,requestId) => {
    try {
      const response = await axios.delete(
        `${DELETE_REQUEST_API}/${id}/${requestId}`
      );

      if (response.data.message === "Request deleted successfully") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the request.");
    } finally {
      window.location.reload();
    }
  };
  const addBook = (requestDetails, id) => {
    if (requestDetails.status === "Added") {
      alert("Book already added to database");
      navigate("/admin");
    } else {
      navigate("/add_book", { state: { id: id, updateData: requestDetails } });
    }
  };
  

  return (
    <div>
      <Navbar_Admin />
      <div className="container mt-5 pt-5">
        <h1 className="text-center mt-5 mb-5">Book Requests</h1>
        <div className="row mt-5 text-center">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12 col-xl-12">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Sl no.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Author</th>
                  <th scope="col">Language</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, userIndex) =>
                  user.request.map((request, requestIndex) => (
                    <tr key={`${userIndex}-${requestIndex}`}>
                      <td>{slNo++}</td>
                      <td>{request.bookname}</td>
                      <td>{request.authorname}</td>
                      <td>{request.language}</td>
                      <td>{request.isbn}</td>
                      <td>{user.email}</td>
                      <td>{request.status}</td>
                      <td>
                      <Tooltip title="Add Book">
                        <IconButton onClick={()=>{
                              addBook(request,user._id)
                            }}>
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                        <Tooltip title="Delete Request">
                        <IconButton
                          onClick={() => {
                            deleteRequest(user._id,request._id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      </td>
                    </tr>
                  )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default All_Requests;
