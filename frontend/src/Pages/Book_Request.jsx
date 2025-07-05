import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import StarsIcon from "@mui/icons-material/Stars";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BOOK_REQUEST_API, PROFILE_API } from "../Apis/api";
import FormHelperText from "@mui/material/FormHelperText";
import Navbar_User from "../Components/User/Navbar_User";
import Footer_User from "../Components/User/Footer_User";

const Book_Request = () => {
  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");

  const [modalMessage, setModalMessage] = useState("");

  const {
    register: requestRegister,
    handleSubmit: requestHandleSubmit,
    watch: requestWatch,
    formState: requestFormState,
    reset: requestReset,
  } = useForm({
    defaultValues: async () => {
      const response = await axios.get(`${PROFILE_API}/${userId}`);
      const info = response.data.info;

      return {
        id: info._id,
        name: info.name,
        email: info.email,
        bookname: "",
        authorname: "",
        language: "",
        isbn: "",
      };
    },
  });


  const { errors: requestErrors } = requestFormState;

  const validationRulesRequest = {
    bookname: {
      required: "Book name is required",
    },
    authorname: {
      required: "Author name is required",
    },
    isbn: {
      required: "ISBN is required",
    },
    language: {
      required: "Language is required",
    },
  };

  const requestHandler = async (requestInputs) => {
    try {
      const data = {
        bookname: requestInputs.bookname,
        authorname: requestInputs.authorname,
        isbn: requestInputs.isbn,
        language: requestInputs.language,
      };

      const response = await axios.put(`${BOOK_REQUEST_API}/${userId}/${token}`, data);

      if (response.data.message === "Book request added successfully") {
        setModalMessage("Book request added successfully");
      } else if (
        response.data.message ===
        "Book request already made and under admin's scrutiny"
      ) {
        setModalMessage("Book request already made and under admin's scrutiny");
      } else {
        setModalMessage(response.data.message);
      }
      // requestReset();
      // requestReset({
      //   bookname:'',
      //   authorname:"",
      //   language:"",
      //   isbn:""
      // });
    } catch (error) {
      console.error("Error:", error);

      alert("An error occurred while updating the profile.");
      // requestReset({
      //   bookname:'',
      //   authorname:"",
      //   language:"",
      //   isbn:""
      // });
    }
    // finally{
    //   requestReset()
    //   // requestClearErrors(["bookname","authorname","isbn","language"])
    // }
  };

  return (
    <div>
      <Navbar_User />
      <div className="container mt-5 pt-5">
        <div className="container text-center mb-5">
          <h1>Request Form</h1>
          <form
            // ref={profileFormRef}
            onSubmit={requestHandleSubmit(requestHandler)}
          >
            <div className="row mt-5">
              <div className="col col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 col-xxl-8 mx-auto">
                {/* 2 column grid layout with text inputs for the first and last names */}
                <div className="row mb-4 gy-4">
                  <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div className="form-outline">
                      <TextField
                        id="outlined-basic-profile-book-name"
                        label="Book Name"
                        variant="outlined"
                        type="text"
                        fullWidth
                        autoComplete=""
                        {...requestRegister(
                          "bookname",
                          validationRulesRequest.bookname
                        )}
                      />
                      <FormHelperText error>
                        {requestErrors.bookname?.message}
                      </FormHelperText>
                    </div>
                  </div>
                  <div className="col col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                    <div className="form-outline">
                      <TextField
                        id="outlined-basic-profile-author-name"
                        label="Author Name"
                        variant="outlined"
                        type="text"
                        fullWidth
                        autoComplete=""
                        {...requestRegister(
                          "authorname",
                          validationRulesRequest.authorname
                        )}
                      />
                      <FormHelperText error>
                        {requestErrors.authorname?.message}
                      </FormHelperText>
                    </div>
                  </div>
                </div>

                {/* ID input */}
                <div className="form-outline mb-4">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      htmlFor="outlined-adornment-Library-Id"
                      shrink={!!requestWatch("id")}
                    >
                      Library ID
                    </InputLabel>

                    <OutlinedInput
                      readOnly
                      {...requestRegister("id")}
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
                <div className="form-outline mb-4">
                  <TextField
                    id="outlined-basic-isbn"
                    label="ISBN"
                    variant="outlined"
                    type="text"
                    fullWidth
                    autoComplete=""
                    {...requestRegister("isbn", validationRulesRequest.isbn)}
                  />
                  <FormHelperText error>
                    {requestErrors.isbn?.message}
                  </FormHelperText>
                </div>

                {/* Language input */}
                <div className="form-outline mb-4">
                  <TextField
                    id="outlined-basic-language"
                    label="Language"
                    variant="outlined"
                    type="text"
                    fullWidth
                    autoComplete=""
                    {...requestRegister(
                      "language",
                      validationRulesRequest.language
                    )}
                  />
                  <FormHelperText error>
                    {requestErrors.language?.message}
                  </FormHelperText>
                </div>

                {/* Email input */}
                <div className="form-outline mb-4">
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="outlined-basic-phone"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: !!requestWatch("email"),
                    }}
                    {...requestRegister("email")}
                  />
                </div>

                {/* Submit button */}
                <div
                  className="modal fade"
                  id="exampleModalToggle"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel"
                  tabIndex="-1"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="exampleModalToggleLabel"
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
                      <div className="modal-body">
                        Click confirm to send request
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-primary"
                          data-bs-target="#staticBackdrop"
                          data-bs-toggle="modal"
                          type="submit"
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
                          id="staticBackdropLabel"
                        >
                          {Object.keys(requestErrors).length === 0
                            ? "Thank you"
                            : "Error"}
                        </h1>
                      </div>
                      <div className="modal-body">
                        {Object.keys(requestErrors).length === 0
                          ? modalMessage
                          : "Please fill the form correctly"}
                      </div>

                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          onClick={()=>requestReset()}
                        >
                          Close
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </div>
                <Button
                  variant="contained"
                  size="large"
                  data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal"
                >
                  SUBMIT
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer_User />
    </div>
  );
};

export default Book_Request;
