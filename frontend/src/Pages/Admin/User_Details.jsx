import React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import Navbar_Admin from "../../Components/Admin/Navbar_Admin";
import { Button, TextField } from "@mui/material";
import UserDetails from "../../Fuctions/Admin/UserDetails";
import { validationRulesProfile } from "../../Fuctions/Validation_rules";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";

const User_Details = () => {
  const {
    id,
    info,
    userUpdateHandler,
    userErrors,
    userRegister,
    userHandleSubmit,
    userWatch,
    requestArray,
    deleteRequest,
    addBook,
    comments,
    commentDeleteHandler,
  } = UserDetails();

  return (
    <div>
      <Navbar_Admin />
      <div className="container mt-5 pt-5 pb-5">
        <h1 className="text-center mb-5">User Details</h1>
        <form onSubmit={userHandleSubmit(userUpdateHandler)}>
          <div className="row">
            <div className="col-col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="input-group mb-3">
                <span className="input-group-text">First Name</span>
                <input
                  type="text"
                  aria-label="firstName"
                  className="form-control"
                  {...userRegister(
                    "firstname",
                    validationRulesProfile.firstname
                  )}
                />
              </div>
              <FormHelperText error className="mb-2">
                {userErrors.firstname?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Last Name</span>
                <input
                  type="text"
                  aria-label="lastName"
                  className="form-control"
                  {...userRegister("lastname", validationRulesProfile.lastname)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {userErrors.lastname?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Username</span>
                <input
                  type="text"
                  aria-label="username"
                  className="form-control"
                  {...userRegister("name", validationRulesProfile.name)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {userErrors.name?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Library ID</span>
                <input
                  type="text"
                  readOnly
                  aria-label="Library ID"
                  className="form-control"
                  {...userRegister("id")}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email</span>
                <input
                  type="email"
                  aria-label="email"
                  className="form-control"
                  {...userRegister("email", validationRulesProfile.email)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {userErrors.email?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Phone</span>
                <input
                  type="text"
                  aria-label="phone"
                  className="form-control"
                  {...userRegister("phone", validationRulesProfile.phone)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {userErrors.phone?.message}
              </FormHelperText>
            </div>
            <div className="col-col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
              <div className="form-outline mb-4">
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={9}
                  id="exampleFormControlTextarea1"
                  {...userRegister("address", validationRulesProfile.address)}
                  InputLabelProps={{
                    shrink: !!userWatch("address"),
                  }}
                />
              </div>
              <FormHelperText error className="mb-2">
                {userErrors.address?.message}
              </FormHelperText>
            </div>
          </div>
          <div className="row mt-4 justify-item-center">
            <div className="col-12 d-flex justify-content-center">
              <Button
                variant="contained"
                size="large"
                type="submit"
                color="success"
              >
                Update
              </Button>
            </div>
          </div>
        </form>

        {requestArray.length > 0 ? (
          <>
            <h1 className="text-center mt-5 mb-5">Book Requests</h1>
            <div className="row mt-5 text-center table-responsive">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12 col-xl-12">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sl no.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Author</th>
                      <th scope="col">Language</th>
                      <th scope="col">ISBN</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestArray.map((requestDetails, key) => (
                      <tr key={key} className="text-center">
                        <th scope="row">{key + 1}</th>
                        <td>{requestDetails.bookname}</td>
                        <td>{requestDetails.authorname}</td>
                        <td>{requestDetails.language}</td>
                        <td>{requestDetails.isbn}</td>
                        <td>{requestDetails.status}</td>
                        <td>
                          <Tooltip title="Add Book">
                            <IconButton
                              onClick={() => {
                                addBook(requestDetails, id);
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Request">
                            <IconButton
                              onClick={() => {
                                deleteRequest(requestDetails._id);
                              }}
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
          </>
        ) : (
          <></>
        )}

        {comments.length > 0 ? (
          <>
            <h1 className="text-center mt-5 mb-5">Comments Section</h1>
            <div className="row mt-5 table-responsive text-center">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12 col-xl-12">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sl no.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Author</th>
                      <th scope="col">Comment</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((commentData, key) => (
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>{commentData.bookname}</td>
                        <td>{commentData.authorname}</td>
                        <td>{commentData.comment}</td>
                        <td>{commentData.commentedAt}</td>
                        <td>
                          <Tooltip title="Delete Comment">
                            <IconButton
                              onClick={() => commentDeleteHandler(commentData)}
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
          </>
        ) : (
          <></>
        )}

        {info.length > 0 ? (
          <>
            <h1 className="text-center mt-5 mb-5">Purchases</h1>
            <div className="row mt-5 table-responsive">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12 col-xl-12">
                <table className="table table-hover table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col">Sl no.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Author</th>
                      <th scope="col">Genre</th>
                      <th scope="col">ISBN</th>
                      <th scope="col">Purchase Count</th>
                      <th scope="col">Rental count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {info.map((info, key) => (
                      <tr key={key}>
                        <th scope="row">{key + 1}</th>
                        <td>{info.bookName}</td>
                        <td>{info.authorName}</td>
                        <td>{info.genre}</td>
                        <td>{info.isbn}</td>
                        <td>{info.bought}</td>
                        <td>{info.rented}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default User_Details;
