import React from "react";
import '../CSS/App.css'
const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted" id="footer">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    
  </section>
      {/* Section: Links */}
      <section>
        <div className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>The Book Spot
              </h6>
              <p>
                Discover a world of stories, from timeless classics to
                contemporary gems, at our book store - where every page comes to
                life.
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">About Us</h6>
              <p>
                <a href="#!" className="text-reset">
                  Vision
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Volunteer
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Carreers
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                Donate
                </a>
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Login
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Register
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Terms of service
                </a>
              </p>
            </div>
            {/* Grid column */}

            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                thebookspot@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links */}

      {/* Copyright */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="/">
          thebookspot.com
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
