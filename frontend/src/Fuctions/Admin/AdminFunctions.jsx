import { useEffect, useState } from "react";
import axios from "axios";
import { ALL_BOOKS_API, DELETE_BOOK_API } from "../../Apis/api";
import { useNavigate } from "react-router-dom";

const AdminFunctions = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const userToken = sessionStorage.getItem("token");


  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${ALL_BOOKS_API}/${userToken}`);
      const data = response.data.data;
      setBookData(data);
    } catch (error) {
      alert(error.response.data.message)
    }
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`${DELETE_BOOK_API}/${id}`)
      .then((response) => {
        if (response.data.message === "Book deleted successfully") {
          alert(response.data.message);
          fetchBookData();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateClicked = (id) => {
    navigate("/update_book", { state: { updateData: id } });
  };

  return {bookData,handleDelete,updateClicked};
};

export default AdminFunctions;
