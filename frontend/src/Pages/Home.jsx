import { React, useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { HOME_BOOK_API } from "../Apis/api";

const Home = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);

  const alert_message = () => {
    alert("Please sign in to view books");
    navigate("/register");
  };

  useEffect(() => {
    fetchBookData();
  }, []);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${HOME_BOOK_API}`);
      const data = response.data.data;
      setBookData(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5 pt-5 py-4">
        <div className="row row-gap-4">
          <div className="col col-12 col-sm-12 col-lg-12 col-xl-12 col-xxl-12 col-md-12">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {bookData.map((bookDetails, key) => (
                <div className="col" key={key}>
                  <div
                    className="card h-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      alert_message();
                    }}
                  >
                    <img
                      src={bookDetails.imageurl}
                      className="card-img-top img-thumbnail"
                      alt="Book Image"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{bookDetails.bookname}</h5>
                      <p className="card-text text-truncate">
                        {bookDetails.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
