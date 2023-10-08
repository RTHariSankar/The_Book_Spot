import React, { useEffect, useState } from "react";
import Navbar_Admin from "../../Components/Admin/Navbar_Admin";
import { ALL_BOOKS_API, ALL_USERS_API } from "../../Apis/api";
import axios from "axios";

const Comments = () => {
  const[user,setUser] = useState([]);
  const [book,setBook] = useState([])
  const [comments,setcomments] = useState([])
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async()=>{
    try {
      const response_user = await axios.get(ALL_BOOKS_API);
      const response_book = await axios.get(ALL_USERS_API);
      setUser(response_user.data);
      setBook(response_book.data)

    } catch (error) {
      console.log(error)
    }
    
  }
  console.log(user)
  console.log(book)

  return (
    <div>
      <Navbar_Admin />
      <div className="container mt-5 pt-5">
        <h1 className="text-center mt-5 mb-5">Comments Section</h1>
        <div className="row mt-5 text-center">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12 col-xl-12">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Sl no.</th>
                  <th scope="col">Email</th>
                  <th scope="col">LibraryID</th>
                  <th scope="col">Book</th>
                  <th scope="col">Author</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Otto</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Otto</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
