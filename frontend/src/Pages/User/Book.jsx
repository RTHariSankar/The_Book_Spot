import React, { useState, useEffect } from "react";
import { FormHelperText, TextField } from "@mui/material";
import Navbar_User from "../../Components/User/Navbar_User";
import { Button } from "@mui/material";
import Footer_User from "../../Components/User/Footer_User";
import {
  ALL_BOOKS_API,
  BUY_RENT_API,
  PROFILE_API,
  USER_COMMET_API,
} from "../../Apis/api";
import axios from "axios";
import { useForm } from "react-hook-form";

const Book = () => {
  const [bookData, setBookData] = useState({});
  const [comments, setComments] = useState([]);
  const bookId = sessionStorage.getItem("BookId");
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${ALL_BOOKS_API}/${bookId}/${token}`);
      const data = response.data.data;
      setBookData(data);
      setComments(data.comments);
    } catch (error) {
      console.error(error);
    }
  };

  const [selectedButton, setSelectedButton] = useState(null);
  const {
    register: commentRegister,
    handleSubmit: commentHandleSubmit,
    formState: commentFormState,
  } = useForm({
    defaultValues: async () => {
      const response = await axios.get(`${PROFILE_API}/${userId}`);
      const info = response.data.info;
      return {
        email: info.email,
      };
    },
  });

  const handleBuyClick = () => {
    setSelectedButton("bought");
  };

  const handleRentClick = () => {
    setSelectedButton("rented");
  };

  const handlePurchase = async () => {
    try {
      let data = {
        bookId: bookId,
        bookName: bookData.bookname,
        genre: bookData.genre,
        language: bookData.language,
        authorName: bookData.authorname,
        isbn: bookData.isbn,
        action: selectedButton,
      };

      const response = await axios.put(`${BUY_RENT_API}/${userId}`, data);
      if (response.data.message !== "Info added successfully") {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while purchasing the book");
    }
  };

  const { errors: commentErrors } = commentFormState;

  const commentHandler = async (comment) => {
    try {
      const data = {
        bookId: bookId,
        bookname: bookData.bookname,
        authorname: bookData.authorname,
        comment: comment.comment,
      };

      const response = await axios.post(`${USER_COMMET_API}/${userId}`, data);

      if (response.data.message === "Comment added successfully") {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the profile.");
    }
  };
  return (
    <div>
      <Navbar_User />
      <div className="container mt-5 pt-5 py-4">
        <div className="row row-gap-3">
          <div className="col col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 d-flex justify-content-center">
            <img
              src={bookData.imageurl}
              className="img"
              alt="..."
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
            <div className="input-group mb-3">
              <span className="input-group-text">Name</span>
              <input
                type="text"
                aria-label="Book Name"
                className="form-control"
                defaultValue={bookData.bookname}
                readOnly
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Author</span>
              <input
                type="text"
                aria-label="Author"
                className="form-control"
                defaultValue={bookData.authorname}
                readOnly
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Genre</span>
              <input
                type="text"
                aria-label="Genre"
                className="form-control"
                defaultValue={bookData.genre}
                readOnly
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Language</span>
              <input
                type="text"
                aria-label="Language"
                className="form-control"
                defaultValue={bookData.language}
                readOnly
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Publication year</span>
              <input
                type="text"
                aria-label="Publication year"
                className="form-control"
                defaultValue={bookData.publicationyear}
                readOnly
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Rental Period</span>
              <input
                type="text"
                aria-label="Rental Period"
                className="form-control"
                defaultValue={bookData.rentalperiod}
                readOnly
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Availability</span>
              <input
                type="text"
                aria-label="Availability"
                className="form-control"
                defaultValue={bookData.availability}
                readOnly
              />
            </div>
            <div className="input-group">
              <span className="input-group-text">ISBN Number</span>
              <input
                type="text"
                aria-label="ISBN Number"
                className="form-control"
                defaultValue={bookData.isbn}
                readOnly
              />
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={17}
              id="exampleFormControlTextarea1"
              defaultValue={bookData.description}
              InputProps={{ readOnly: true }}
            />
          </div>
        </div>
        <div className="row mt-4 justify-item-center">
          <div className="col-12 d-flex justify-content-center">
            <Button
              variant="contained"
              size="large"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              COMMENTS
            </Button>
            <div
              className="modal fade"
              id="exampleModalToggle"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel"
              tabIndex="-1"
            >
              <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id="exampleModalToggleLabel"
                    >
                      Top Comments
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {comments.map((comment, key) => (
                      <div className="card mb-2" key={key}>
                        <div className="card-body">
                          <blockquote className="blockquote mb-0">
                            <p>{comment.comment}</p>
                            <footer className="blockquote-footer">
                              {comment.userEmail}
                            </footer>
                          </blockquote>
                        </div>
                      </div>
                    ))}
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
                      className="btn btn-primary"
                      data-bs-target="#exampleModalToggle2"
                      data-bs-toggle="modal"
                    >
                      Add comments
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModalToggle2"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel2"
              tabIndex="-1"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5"
                      id="exampleModalToggleLabel2"
                    >
                      Your comment
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form onSubmit={commentHandleSubmit(commentHandler)}>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Recipient email:
                        </label>
                        <input
                          readOnly
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          {...commentRegister("email")}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Comment:
                        </label>
                        <textarea
                          className="form-control"
                          id="message-text"
                          {...commentRegister("comment", {
                            required: "*this field is required",
                          })}
                        />
                      </div>
                      <FormHelperText error>
                        {commentErrors.comment?.message}
                      </FormHelperText>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        data-bs-target="#exampleModalToggle"
                        data-bs-toggle="modal"
                      >
                        Top Comments
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Add Comment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <Button
              variant="contained"
              size="large"
              style={{ marginLeft: "10px" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleBuyClick}
            >
              BUY
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{ marginLeft: "10px" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={handleRentClick}
            >
              RENT
            </Button>
            <div
              className="modal fade"
              id="exampleModal"
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
                  <div className="modal-body text-center">
                    Please confirm your
                    {selectedButton === "bought" ? " purchase" : " rental"}
                  </div>
                  <div className="modal-footer mx-auto">
                    {selectedButton === "bought" ? (
                      <button
                        className="btn btn-primary"
                        data-bs-target="#exampleModal2"
                        data-bs-toggle="modal"
                        onClick={() => {
                          handlePurchase();
                        }}
                      >
                        I confirm buy
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        data-bs-target="#exampleModal2"
                        data-bs-toggle="modal"
                        onClick={() => {
                          handlePurchase();
                        }}
                      >
                        I confirm rent
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="exampleModal2"
              aria-hidden="true"
              aria-labelledby="exampleModalToggleLabel2"
              tabIndex="-1"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content text-center">
                  <div className="modal-body">Thank you for your purchase </div>
                  <div className="modal-footer mx-auto">
                    <button className="btn btn-primary" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer_User />
    </div>
  );
};

export default Book;
