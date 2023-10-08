import React from "react";
import Navbar_User from "../../Components/User/Navbar_User";
import { useNavigate } from "react-router-dom";
import Footer_User from "../../Components/User/Footer_User";
import AdminFunctions from "../../Fuctions/Admin/AdminFunctions";
import { Tooltip } from "@mui/material";
import '../../CSS/App.css'

const User = () => {
  const navigate = useNavigate();
  const book_details = (bookDetails) => {
    sessionStorage.setItem("BookId",bookDetails._id)
    navigate("/book_details");
  };

  const { bookData } = AdminFunctions();
  return (
    <div>
      <Navbar_User />
      <div className="container mt-5 pt-5 py-4">
        <div className="row row-gap-4">
          <div className="col col-12 col-sm-12 col-lg-12 col-xl-12 col-xxl-12 col-md-12">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {bookData.map((bookDetails,key) => (
                <div className="col" key={key}>
                  <Tooltip title="Click to view" placement="top">
                  <div className="card h-100" style={{cursor:'pointer'}} onClick={()=>{book_details(bookDetails)}}>
                    <img
                      src={bookDetails.imageurl}
                      className="card-img-top img-thumbnail"
                      alt="Book Image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{bookDetails.bookname}</h5>
                      <p className="card-text text-truncate">{bookDetails.description}</p>
                    </div>
                  </div>
                  </Tooltip>
                  </div>

                  
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer_User />
    </div>
  );
};

export default User;
