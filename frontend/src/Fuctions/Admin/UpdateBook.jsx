import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BOOK_DETAILS_API, UPDATE_BOOK_API } from "../../Apis/api";

const UpdateBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");


  const {
    register: bookRegister,
    handleSubmit: bookHandleSubmit,
    formState: bookFormState,
    watch: bookWatch,
  } = useForm({
    defaultValues: async () => {
      if (location.state && location.state.updateData) {
        const id = location.state.updateData;

        const response = await axios.get(`${BOOK_DETAILS_API}/${id}/${token}`);
        const info = response.data.data;
        return {
          bookname: info.bookname,
          authorname: info.authorname,
          genre: info.genre,
          language: info.language,
          publicationyear: info.publicationyear,
          rentalperiod: info.rentalperiod,
          availability: info.availability,
          isbn: info.isbn,
          imageurl: info.imageurl,
          description: info.description,
          price: info.price,
          stock: info.stock,
        };
      }
    },
  });

  const { errors: bookErrors } = bookFormState;

  const bookUpdateHandler = async (bookinputs) => {
    const id = location.state.updateData;

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
      await axios
        .put(`${UPDATE_BOOK_API}/${id}`, data)
        .then((response) => {
          if (response.data.message === "Book updated successfully") {
            alert("Book updated successfully");
            navigate("/admin");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    bookUpdateHandler,
    bookErrors,
    bookRegister,
    bookHandleSubmit,
    bookWatch,
  };
};

export default UpdateBook;
