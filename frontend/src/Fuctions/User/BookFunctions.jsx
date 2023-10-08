import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ALL_BOOKS_API } from "../../Apis/api";
import axios from "axios";

const BookFunctions = () => {
  const location = useLocation();
  const [bookData, setBookData] = useState(null);
  const bookId = location.state.updateData._id;
  const [comments, setComments] = useState(null);
  const userToken = sessionStorage.getItem("token");

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${ALL_BOOKS_API}/${bookId}`);
      const data = response.data.data;
      setBookData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setComments(bookData.comments);
    }
  };
  return {
    bookData,comments,bookId
  };
};

export default BookFunctions;
