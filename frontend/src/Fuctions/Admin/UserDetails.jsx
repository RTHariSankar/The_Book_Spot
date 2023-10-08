import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DELETE_REQUEST_API,
  PROFILE_API,
  PROFILE_UPDATE_API,
  USER_COMMENT_DELETE_API,
} from "../../Apis/api";
import { useState, useEffect } from "react";

const UserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [info,setInfo] = useState([]);
  const [requestArray, setRequestArray] = useState([]);
  const [comments, setComments] = useState([]);
  const id = location.state.updateData;

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.updateData) {
        const id = location.state.updateData;

        try {
          const response = await axios.get(`${PROFILE_API}/${id}`);
          const info = response.data.info;
          setInfo(info.info);
          setComments(info.comments);
          setRequestArray(info.request || []);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [location.state]);

  const {
    register: userRegister,
    handleSubmit: userHandleSubmit,
    formState: userFormState,
    watch: userWatch,
  } = useForm({
    defaultValues: async () => {
      if (location.state && location.state.updateData) {
        try {
          const response = await axios.get(`${PROFILE_API}/${id}`);
          const info = response.data.info;

          return {
            firstname: info.firstname,
            lastname: info.lastname,
            name: info.name,
            id: info._id,
            email: info.email,
            phone: response.data.phone,
            address: response.data.address,
          };
        } catch (error) {
          console.error(error);
        }
      }
    },
  });

  const { errors: userErrors } = userFormState;

  const userUpdateHandler = async (userInputs) => {
    try {
      let data = {
        firstname: userInputs.firstname,
        lastname: userInputs.lastname,
        name: userInputs.name,
        email: userInputs.email,
        phone: userInputs.phone,
        address: userInputs.address,
      };
      await axios
        .put(`${PROFILE_UPDATE_API}/${id}`, data)
        .then((response) => {
          if (response.data.message === "Profile Updated successfully") {
            alert("Profile Updated successfully");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      window.location.reload();
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      const response = await axios.delete(
        `${DELETE_REQUEST_API}/${id}/${requestId}`
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

  const addBook = (requestDetails, id) => {
    if (requestDetails.status === "Added") {
      alert("Book already added to database");
      navigate("/admin");
    } else {
      navigate("/add_book", { state: { id: id, updateData: requestDetails } });
    }
  };

  const {
    register: commentRegister,
    handleSubmit: commentHandleSubmit,
    formState: commentFormState,
  } = useForm();
  const { errors: commentErrors } = commentFormState;
  const commentDeleteHandler = async (commentData) => {
    try {
      const data = {
        userId: location.state.updateData,
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

  return {
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
    commentRegister,
    commentHandleSubmit,
    commentErrors,
    commentDeleteHandler,
  };
};

export default UserDetails;
