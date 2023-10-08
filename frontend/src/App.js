import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./CSS/App.css";
import Home from "./Pages/Home";
import SignInUp from "./Pages/SignInUp";
import User from "./Pages/User/User";
import Admin from "./Pages/Admin/Admin";
import Profile from "./Pages/Profile";
import Book from "./Pages/User/Book";
import Book_Request from "./Pages/Book_Request";
import Add_Book from "./Pages/Admin/Add_Book";
import Update_Book from "./Pages/Admin/Update_Book";
import User_Database from "./Pages/Admin/User_Database";
import User_Details from "./Pages/Admin/User_Details";
import Comments from "./Pages/Admin/Comments";
import All_Requests from "./Pages/Admin/All_Requests";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/nav" element={<Navbar />} />
          <Route path="/foot" element={<Footer />} /> */}
          <Route path="/register" element={<SignInUp />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/navu" element={<Navbar_User />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/book_details" element={<Book />} />
          <Route path="/book_request" element={<Book_Request />} />
          {/* <Route path="/nava" element={<Navbar_Admin />} /> */}
          <Route path="/add_book" element={<Add_Book />} />
          <Route path="/update_book" element={<Update_Book />} />
          <Route path="/user_database" element={<User_Database />} />
          <Route path="/user_details" element={<User_Details />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/all_requests" element={<All_Requests />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
