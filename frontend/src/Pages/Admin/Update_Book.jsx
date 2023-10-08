import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Navbar_Admin from "../../Components/Admin/Navbar_Admin";
import { validationRulesBook } from "../../Fuctions/Validation_rules";
import UpdateBook from "../../Fuctions/Admin/UpdateBook";

const Update_Book = () => {
  
  const {bookUpdateHandler,bookErrors,bookRegister,
          bookHandleSubmit,bookWatch,} = UpdateBook();
  return (
    <div>
      <Navbar_Admin />
      <div className="container mt-5 pt-5 py-4">
        <h1 className="text-center mb-5">Book Details</h1>
        <form onSubmit={bookHandleSubmit(bookUpdateHandler)}>
          <div className="row row-gap-3">
            <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
              <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input
                  type="text"
                  aria-label="Bookname"
                  className="form-control"
                  {...bookRegister("bookname", validationRulesBook.bookname)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.bookname?.message}
              </FormHelperText>

              <div className="input-group mb-3">
                <span className="input-group-text">Author</span>
                <input
                  type="text"
                  aria-label="Author Name"
                  className="form-control"
                  {...bookRegister(
                    "authorname",
                    validationRulesBook.authorname
                  )}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.authorname?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Genre</span>
                <input
                  type="text"
                  aria-label="Genre"
                  className="form-control"
                  {...bookRegister("genre", validationRulesBook.genre)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.genre?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Language</span>
                <input
                  type="text"
                  aria-label="Language"
                  className="form-control"
                  {...bookRegister("language", validationRulesBook.language)}
                />
              </div>

              <FormHelperText error className="mb-2">
                {bookErrors.language?.message}
              </FormHelperText>
              <div className="input-group">
                <span className="input-group-text">Publication year</span>
                <input
                  type="text"
                  aria-label="Publication year"
                  className="form-control"
                  {...bookRegister(
                    "publicationyear",
                    validationRulesBook.publicationyear
                  )}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.publicationyear?.message}
              </FormHelperText>
            </div>
            <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
              <div className="input-group mb-3">
                <span className="input-group-text">Rental Period</span>
                <input
                  type="text"
                  aria-label="Rental Period"
                  className="form-control"
                  {...bookRegister(
                    "rentalperiod",
                    validationRulesBook.rentalperiod
                  )}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.rentalperiod?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Availability</span>
                <input
                  type="text"
                  aria-label="Availability"
                  className="form-control"
                  {...bookRegister(
                    "availability",
                    validationRulesBook.availability
                  )}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.availability?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Image Url</span>
                <input
                  type="text"
                  aria-label="Image_Url"
                  className="form-control"
                  {...bookRegister("imageurl", validationRulesBook.imageurl)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.imageurl?.message}
              </FormHelperText>
              <div className="input-group mb-3">
                <span className="input-group-text">Stock count</span>
                <input
                  type="text"
                  aria-label="Image_Url"
                  className="form-control"
                  {...bookRegister("stock", validationRulesBook.stock)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.stock?.message}
              </FormHelperText>
              <div className="input-group">
                <span className="input-group-text">ISBN</span>
                <input
                  type="text"
                  aria-label="ISBN Number"
                  className="form-control"
                  {...bookRegister("isbn", validationRulesBook.isbn)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.isbn?.message}
              </FormHelperText>
            </div>
            <div className="col col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
              <div className="input-group">
                <span className="input-group-text">Price</span>
                <input
                  type="text"
                  aria-label="price"
                  className="form-control"
                  {...bookRegister("price", validationRulesBook.price)}
                />
              </div>
              <FormHelperText error className="mb-2">
                {bookErrors.price?.message}
              </FormHelperText>
              <TextField
                className="mt-2"
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={7}
                placeholder="Type here"
                id="exampleFormControlTextarea1"
                {...bookRegister(
                  "description",
                  validationRulesBook.description
                )}
                InputLabelProps={{
                  shrink: !!bookWatch("description"),
                }}
              />
              <FormHelperText error className="mb-2">
                {bookErrors.description?.message}
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
      </div>
    </div>
  );
};

export default Update_Book;
