import React from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/App.css'

const Navbar = () => {
  const navigate = useNavigate();
  const register = () => {
    navigate("/register", {
      state: { updateData: "register" },
    });
  };

  return (
    <div className="glass">
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
        <a className="navbar-brand" href="/">
            <img
              src="data:image/png;base64,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"
              alt="Book Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top"
            />
            &nbsp;The Book Spot
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                The Book Spot
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/register">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link active" href="/register">
                    Register
                  </a> */}
                  <button
                    type="button"
                    className="btn btn-link"
                    style={{ textDecoration: "none", color: "black" , paddingLeft:'0px' }}
                    onClick={register}
                  >
                    Register
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link active dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    About Us
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Vision
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Volunteer
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Carreers
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Donate
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Terms of service
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              {/* <form className="d-flex mt-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
