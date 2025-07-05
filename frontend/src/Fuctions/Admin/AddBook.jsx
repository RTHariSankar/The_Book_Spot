import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_BOOK_API, REQUEST_STATUS_UPDATE_API } from "../../Apis/api";

const AddBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')

  const {
    register: bookRegister,
    handleSubmit: bookHandleSubmit,
    formState: bookFormState,
    watch: bookWatch,
    reset: bookReset,
  } = useForm({
    defaultValues: async () => {
      if (location.state && location.state.updateData) {
        let requestArray = location.state.updateData;
        return {
          bookname: requestArray.bookname,
          authorname: requestArray.authorname,
          language: requestArray.language,
          isbn: requestArray.isbn,
        };
      }
    },
  });

  const { errors: bookErrors } = bookFormState;

  const bookHandler = async (bookinputs) => {
    try {
      let data = {
        bookname: bookinputs.bookname,
        genre: bookinputs.genre,
        language: bookinputs.language,
        publicationyear: bookinputs.publicationyear,
        rentalperiod: bookinputs.rentalperiod,
        availability: bookinputs.availability,
        authorname: bookinputs.authorname,
        isbn: bookinputs.isbn,
        imageurl: bookinputs.imageurl,
        stock: bookinputs.stock,
        description: bookinputs.description,
        price: bookinputs.price,
      };

      if (location.state && location.state.updateData) {
        let id = location.state.id;
        let requestArray = location.state.updateData;

        const add_response = await axios.post(`${ADD_BOOK_API}/${token}`, data);

        if (add_response.data.message === "Book added successfully") {
          const request_response = await axios.put(
            `${REQUEST_STATUS_UPDATE_API}/${id}/${requestArray._id}`
          );

          if (
            request_response.data.message ===
            "Request status updated successfully"
          ) {
            alert("Book added and Request status updated successfully");
            navigate("/admin");
          } else {
            alert(
              `Request status update failed: ${request_response.data.message}`
            );
          }
        } else {
          alert(`Book addition failed: ${add_response.data.message}`);
        }
      } else {
        const response = await axios.post(`${ADD_BOOK_API}/${token}`, data);

        if (response.data.message === "Book added successfully") {
          alert("Book added successfully");
        } else {
          alert(`Book addition failed: ${response.data.message}`);
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    } finally {
      bookReset();
    }
  };

  return {
    bookRegister,
    bookHandleSubmit,
    bookWatch,
    bookErrors,
    bookHandler,
  };
};

export default AddBook;
