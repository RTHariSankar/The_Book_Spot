import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StarsIcon from "@mui/icons-material/Stars";
import Navbar_User from "../Components/User/Navbar_User";
import Footer_User from "../Components/User/Footer_User";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  DELETE_REQUEST_API,
  PROFILE_API,
  PROFILE_UPDATE_API,
  USER_COMMENT_DELETE_API,
  USER_COMMENT_UPDATE_API,
} from "../Apis/api";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { validationRulesProfile } from "../Fuctions/Validation_rules";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [requestArray, setRequsetArray] = useState([]);
  const [info, setInfo] = useState([]);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register: profileRegister,
    handleSubmit: profileHandleSubmit,
    watch: profileWatch,
    formState: profileFormState,
  } = useForm({
    defaultValues: async () => {
      const response = await axios.get(`${PROFILE_API}/${userId}`);
      const info = response.data.info;
      setInfo(info.info);
      setComments(info.comments);
      setRequsetArray(info.request);

      return {
        firstname: info.firstname || "",
        lastname: info.lastname || "",
        id: info._id,
        name: info.name,
        email: info.email,
        password: response.data.password,
        confirmPassword: response.data.password,
        phone: response.data.phone || "",
        address: response.data.address || "",
      };
    },
  });
  const {
    register: commentRegister,
    handleSubmit: commentHandleSubmit,
    formState: commentFormState,
  } = useForm();

  const { errors: profileErrors } = profileFormState;
  const { errors: commentErrors } = commentFormState;

  const profileHandler = async (profileInputs) => {
    try {
      const data = {
        firstname: profileInputs.firstname,
        lastname: profileInputs.lastname,
        name: profileInputs.name,
        email: profileInputs.email,
        password: profileInputs.password,
        phone: profileInputs.phone,
        address: profileInputs.address,
      };

      const response = await axios.put(`${PROFILE_UPDATE_API}/${userId}`, data);

      if (response.data.message === "Profile Updated successfully") {
        navigate("/profile");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the profile.");
    }
  };
  const commentDeleteHandler = async (commentData) => {
    try {
      const data = {
        userId: userId,
        bookId: commentData.bookId,
        commentText: commentData.comment,
      };
      const response = await axios.delete(USER_COMMENT_DELETE_API, { data });
      if (response.data.message === "Comment deleted successfully") {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const commentUpdateHandler = async (commentInput) => {
    try {
      const data = {
        userId: userId,
        bookId: commentInput.bookId,
        oldCommentText: commentInput.oldCommentText,
        newCommentText: commentInput.newCommentText,
      };
      const response = await axios.put(USER_COMMENT_UPDATE_API, data);
      if (response.data.message === "Comment updated successfully") {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      const response = await axios.delete(
        `${DELETE_REQUEST_API}/${userId}/${requestId}`
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

  return (
    <div>
      <Navbar_User />
      <div className="container mt-5 pt-5 pb-5">
        <div className="container text-center mb-5">
          <h1>My Profile</h1>
        </div>
        <form onSubmit={profileHandleSubmit(profileHandler)}>
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7 mx-auto">
              {/* 2 column grid layout with text inputs for the first and last names */}
              <div className="row mb-4 gy-4">
                <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <div className="form-outline">
                    <TextField
                      id="outlined-basic-profile-first-name"
                      label="First Name"
                      variant="outlined"
                      type="text"
                      fullWidth
                      {...profileRegister(
                        "firstname",
                        validationRulesProfile.firstname
                      )}
                      InputLabelProps={{
                        shrink: !!profileWatch("firstname"),
                      }}
                    />
                    <FormHelperText error>
                      {profileErrors.firstname?.message}
                    </FormHelperText>
                  </div>
                </div>
                <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                  <div className="form-outline">
                    <TextField
                      id="outlined-basic-profile-last-name"
                      label="Last Name"
                      variant="outlined"
                      type="text"
                      fullWidth
                      {...profileRegister(
                        "lastname",
                        validationRulesProfile.lastname
                      )}
                      InputLabelProps={{
                        shrink: !!profileWatch("lastname"),
                      }}
                    />
                    <FormHelperText error>
                      {profileErrors.lastname?.message}
                    </FormHelperText>
                  </div>
                </div>
              </div>
              {/* ID input */}
              <div className="form-outline mb-4">
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-Library-Id"
                    shrink={!!profileWatch("id")}
                  >
                    Library ID
                  </InputLabel>

                  <OutlinedInput
                    readOnly
                    {...profileRegister("id")}
                    id="outlined-adornment-Library-Id"
                    endAdornment={
                      userRole === "premium user" && (
                        <InputAdornment
                          position="end"
                          title="Premium membership"
                        >
                          <IconButton edge="end">
                            <StarsIcon style={{ cursor: "pointer" }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                    label="Library ID"
                  />
                </FormControl>
              </div>

              {/* Text input */}
              <div className="form-outline mb-4">
                <TextField
                  id="outlined-basic-profile-username"
                  label="Username"
                  variant="outlined"
                  type="text"
                  fullWidth
                  autoComplete=""
                  {...profileRegister("name", validationRulesProfile.name)}
                  InputLabelProps={{
                    shrink: !!profileWatch("name"),
                  }}
                />
                <FormHelperText error>
                  {profileErrors.name?.message}
                </FormHelperText>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <TextField
                  id="outlined-basic-profile-email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  autoComplete=""
                  {...profileRegister("email", validationRulesProfile.email)}
                  InputLabelProps={{
                    shrink: !!profileWatch("email"),
                  }}
                />

                <FormHelperText error>
                  {profileErrors.email?.message}
                </FormHelperText>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    shrink={!!profileWatch("password")}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...profileRegister(
                      "password",
                      validationRulesProfile.password
                    )}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <FormHelperText error>
                  {profileErrors.password?.message}
                </FormHelperText>
              </div>

              {/* Confirm Password input */}
              <div className="form-outline mb-4">
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    htmlFor="outlined-adornment-cpassword"
                    shrink={!!profileWatch("confirmPassword")}
                  >
                    Confirm password
                  </InputLabel>
                  <OutlinedInput
                    {...profileRegister("confirmPassword", {
                      required: "Password confirmation is required",
                      validate: (val) => {
                        if (profileWatch("password") !== val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                    id="outlined-adornment-cpassword"
                    type={showPassword ? "text" : "password"}
                    label="Confirm password"
                  />
                </FormControl>
                <FormHelperText error>
                  {profileErrors.confirmPassword?.message}
                </FormHelperText>
              </div>

              {/* Number input */}
              <div className="form-outline mb-4">
                <TextField
                  id="outlined-basic-phone"
                  label="Phone"
                  variant="outlined"
                  type="text"
                  fullWidth
                  autoComplete=""
                  {...profileRegister("phone", validationRulesProfile.phone)}
                  InputLabelProps={{
                    shrink: !!profileWatch("phone"),
                  }}
                />
                <FormHelperText error>
                  {profileErrors.phone?.message}
                </FormHelperText>
              </div>

              {/* Address input */}
              <div className="form-outline mb-4">
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={8}
                  id="exampleFormControlTextarea1"
                  {...profileRegister(
                    "address",
                    validationRulesProfile.address
                  )}
                  InputLabelProps={{
                    shrink: !!profileWatch("address"),
                  }}
                />
                <FormHelperText error>
                  {profileErrors.address?.message}
                </FormHelperText>
              </div>
              {/* Submit button */}
              <div className="text-center">
                <Button
                  variant="contained"
                  size="large"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalSubmit"
                >
                  Submit
                </Button>
              </div>
              <div
                className="modal fade"
                id="exampleModalSubmit"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabelSubmit"
                tabIndex="-1"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id="exampleModalToggleLabelSubmit"
                      >
                        Confirmation
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body text-center">
                      Press confirm to change your details
                    </div>
                    <div className="modal-footer mx-auto">
                      <button
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        type="submit"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Premium membership */}

              {/* <div className="text-center mt-3">
                <Button
                  color="error"
                  variant="contained"
                  size="large"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  DELETE ACCOUNT
                </Button>
              </div>
              <div
                className="modal fade"
                id="exampleModalToggle"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabIndex="-1"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content text-center">
                    <div className="modal-header ">
                      <h1
                        className="modal-title fs-5"
                        id="exampleModalToggleLabel"
                      >
                        DELETE ACCOUNT
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure you want to delete your account?
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-primary"
                        data-bs-target="#staticBackdrop"
                        data-bs-toggle="modal"
                      >
                        I confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id="exampleModalToggleLabel2"
                      >
                        Thank You
                      </h1>
                      
                    </div>
                    <div className="modal-body">
                      Your account has been deleted. You will be redirected to
                      home page
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        onClick={() => handleDelete(userId)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </form>

        {requestArray.length > 0 ? (
          <>
            <h1 className="text-center mt-5 mb-5">My Book Requests</h1>
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

        {/* My Comments Table */}
        {comments.length > 0 ? (
          <>
            <h1 className="text-center mt-5 mb-5">My Comments</h1>
            <div className="row mt-5 table-responsive">
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
                          <Tooltip title="Edit">
                            <IconButton
                              data-bs-toggle="modal"
                              data-bs-target="#commentUpdateModel"
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <div
                            className="modal fade"
                            id="commentUpdateModel"
                            tabIndex="-1"
                            aria-labelledby="exampleModalUpdateLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1
                                    className="modal-title fs-5"
                                    id="exampleModalUpdateLabel"
                                  >
                                    Update Comment
                                  </h1>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <form
                                  onSubmit={commentHandleSubmit(
                                    commentUpdateHandler
                                  )}
                                >
                                  <div className="modal-body">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="commentTextArea"
                                        className="col-form-label"
                                      >
                                        New Comment:
                                      </label>
                                      <textarea
                                        className="form-control"
                                        id="commentArea"
                                        {...commentRegister("newCommentText", {
                                          required: "*this field is required",
                                        })}
                                      />
                                      <FormHelperText error>
                                        {commentErrors.newCommentText?.message}
                                      </FormHelperText>
                                    </div>

                                    <input
                                      type="hidden"
                                      defaultValue={commentData.bookId}
                                      {...commentRegister("bookId")}
                                    />
                                    <input
                                      type="hidden"
                                      defaultValue={commentData.comment}
                                      {...commentRegister("oldCommentText")}
                                    />
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>

                          <Tooltip title="Delete">
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
            <h1 className="text-center mt-5 mb-5">My Purchases</h1>
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
      <Footer_User />
    </div>
  );
};

export default Profile;
