import { useEffect, useState } from "react";
import { ALL_USERS_API, DELETE_USER } from "../../Apis/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDatabase = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const token = sessionStorage.getItem("token");


  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${ALL_USERS_API}/${token}`);
      const data = response.data.users;
      setUserData(data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };
  const updateClicked = (id) => {
    navigate("/user_details", { state: { updateData: id } });
  };
  const handleDelete = async (id) => {
    
    await axios
      .delete(`${DELETE_USER}/${id}`)
      .then((response) => {
        if (response.data.message === "User deleted successfully") {
          alert(response.data.message);
          fetchUserData();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  };
  return {
    userData,
    updateClicked,handleDelete
  };
};

export default UserDatabase;
