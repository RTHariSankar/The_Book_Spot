import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLocation, useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import { useForm } from "react-hook-form";
import { REGISTER_API, LOGIN_API } from "../Apis/api";
import {
  validationRulesLogin,
  validationRulesRegistration,
} from "../Fuctions/Validation_rules";
import Footer from "../Components/Footer";

const SignInUp = () => {
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    formState: loginFormState,
    reset: loginReset,
  } = useForm();

  const { errors: loginErrors } = loginFormState;

  const {
    register: signUpRegister,
    handleSubmit: signUpHandleSubmit,
    formState: signUpFormState,
    watch: signUpWatch,
    reset: signUpReset,
  } = useForm();

  const { errors: signUpErrors } = signUpFormState;

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const initialTab =
    location.state && location.state.updateData === "register"
      ? "register"
      : "login";
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const logInHandler = async (signInInputs) => {
    let data = {
      email: signInInputs.email,
      password: signInInputs.password,
    };
    try {
      const response = await axios.post(LOGIN_API, data);

      if (
        response.data.message === "Login successful" &&
        response.data.data.role === "user"
      ) {
        const token = response.data.token
        const userId = response.data.data._id;
        const userRole = response.data.data.role;
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("role", userRole);
        sessionStorage.setItem("token", token);
        alert(response.data.message);
        navigate("/user");
      } else if (
        response.data.message === "Login successful" &&
        response.data.data.role === "admin"
      ) {
        const userId = response.data.data._id;
        const userRole = response.data.data.role;
        const token = response.data.token
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("role", userRole);
        alert(response.data.message);
        navigate("/admin");
      } else if (response.data.message === "Incorrect password") {
        alert(response.data.message);
        handleTabSwitch("login");
      } else {
        alert(response.data.message);
        handleTabSwitch("register");
      }
      loginReset();
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const signInHandler = async (signInInputs) => {
    let data = {
      name: signInInputs.name,
      email: signInInputs.email,
      password: signInInputs.password,
    };
    await axios
      .post(REGISTER_API, data)
      .then((response) => {
        if (response.data.message === "Registration Successful") {
          const userId = response.data.data._id;
          const userRole = response.data.data.role;
          const token = response.data.token
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("role", userRole);
          alert(response.data.message);

          navigate("/user");
        } else {
          alert(response.data.message);
          handleTabSwitch("login");
        }
        signUpReset();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    signUpReset();
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 p-5">
        <div className="row">
          <div className="col col-12 col-lg-5 col-md-7 col-sm-8 col-xl-5 col-xxl-5 mx-auto">
            {/* Pills navs */}
            <ul className="nav nav-pills nav-justified mb-3" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "login" ? "active" : ""
                  }`}
                  onClick={() => handleTabSwitch("login")}
                >
                  Login
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "register" ? "active" : ""
                  }`}
                  onClick={() => handleTabSwitch("register")}
                >
                  Register
                </button>
              </li>
            </ul>
            {/* Pills navs */}

            {/* Pills content */}
            <div className="tab-content">
              <div
                className={`tab-pane fade ${
                  activeTab === "login" ? "show active" : ""
                }`}
              >
                <form onSubmit={loginHandleSubmit(logInHandler)}>
                  {/* Email input */}
                  <div className="form-outline mb-4 mt-5">
                    <TextField
                      id="outlined-basic-login-email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      fullWidth
                      autoComplete="email"
                      {...loginRegister("email", validationRulesLogin.email)}
                    />

                    <FormHelperText error>
                      {loginErrors.email?.message}
                    </FormHelperText>
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-login-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        {...loginRegister(
                          "password",
                          validationRulesLogin.password
                        )}
                        id="outlined-adornment-login-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                    <FormHelperText error>
                      {loginErrors.password?.message}
                    </FormHelperText>
                  </div>

                  {/* Submit button */}
                  <div className="text-center">
                    <Button variant="contained" size="large" type="submit">
                      Login
                    </Button>
                  </div>

                  {/* Register buttons */}
                  <div className="text-center mt-4">
                    <p>
                      Not a member?
                      <a
                        className={`nav-link ${
                          activeTab === "register" ? "active" : ""
                        }`}
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => handleTabSwitch("register")}
                      >
                        Register
                      </a>
                    </p>
                  </div>
                </form>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "register" ? "show active" : ""
                }`}
              >
                <form onSubmit={signUpHandleSubmit(signInHandler)}>
                  {/* Name input */}
                  <div className="form-outline mt-5 mb-4">
                    <TextField
                      id="outlined-basic-name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      autoComplete="name"
                      type="text"
                      {...signUpRegister(
                        "name",
                        validationRulesRegistration.name
                      )}
                    />
                    <FormHelperText error>
                      {signUpErrors.name?.message}
                    </FormHelperText>
                  </div>

                  {/* Email input */}
                  <div className="form-outline mb-4">
                    <TextField
                      id="outlined-basic-register-email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      fullWidth
                      autoComplete="email"
                      {...signUpRegister(
                        "email",
                        validationRulesRegistration.email
                      )}
                    />
                    <FormHelperText error>
                      {signUpErrors.email?.message}
                    </FormHelperText>
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        {...signUpRegister(
                          "password",
                          validationRulesRegistration.password
                        )}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <FormHelperText error>
                      {signUpErrors.password?.message}
                    </FormHelperText>
                  </div>

                  {/* Confirm Password input */}
                  <div className="form-outline mb-4">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-cpassword">
                        Confirm password
                      </InputLabel>
                      <OutlinedInput
                        {...signUpRegister("confirmPassword", {
                          required: "Password confirmation is required",
                          validate: (val) => {
                            if (signUpWatch("password") !== val) {
                              return "Your passwords do no match";
                            }
                          },
                        })}
                        id="outlined-adornment-cpassword"
                        type={showPassword ? "text" : "password"}
                        label="Confirm password"
                      />
                    </FormControl>
                    <FormHelperText error>
                      {signUpErrors.confirmPassword?.message}
                    </FormHelperText>
                  </div>

                  {/* Submit button */}
                  <div className="text-center">
                    <Button variant="contained" size="large" type="submit">
                      Register
                    </Button>
                  </div>
                  <div className="text-center mt-4">
                    <p>
                      Already a member?
                      <a
                        className={`nav-link ${
                          activeTab === "login" ? "active" : ""
                        }`}
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => handleTabSwitch("login")}
                      >
                        Login
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            {/* Pills content */}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SignInUp;
