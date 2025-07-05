// src/config/api.js

const BASE_URL = process.env.REACT_APP_API_BASE;

const PROFILE_API = `${BASE_URL}/userInfo`;
const REGISTER_API = `${BASE_URL}/register`;
const LOGIN_API = `${BASE_URL}/login`;
const PROFILE_UPDATE_API = `${BASE_URL}/userUpdate`;
const BOOK_REQUEST_API = `${BASE_URL}/userRequest`;
const ADD_BOOK_API = `${BASE_URL}/addBook`;
const ALL_BOOKS_API = `${BASE_URL}/bookDetails`;
const DELETE_BOOK_API = `${BASE_URL}/bookDelete`;
const BOOK_DETAILS_API = `${BASE_URL}/bookDetails`;
const UPDATE_BOOK_API = `${BASE_URL}/bookUpdate`;
const ALL_USERS_API = `${BASE_URL}/allUsers`;
const DELETE_USER = `${BASE_URL}/userDelete`;
const DELETE_REQUEST_API = `${BASE_URL}/requestDelete`;
const REQUEST_STATUS_UPDATE_API = `${BASE_URL}/requestStatusUpdate`;
const USER_COMMET_API = `${BASE_URL}/userComments`;
const USER_COMMENT_DELETE_API = `${BASE_URL}/userComments`;
const USER_COMMENT_UPDATE_API = `${BASE_URL}/updateComment`;
const BUY_RENT_API = `${BASE_URL}/userBookInfo`;
const HOME_BOOK_API = `${BASE_URL}/homeBookDetails`;

export {
  PROFILE_API,
  REGISTER_API,
  LOGIN_API,
  PROFILE_UPDATE_API,
  BOOK_REQUEST_API,
  ALL_BOOKS_API,
  DELETE_BOOK_API,
  ADD_BOOK_API,
  BOOK_DETAILS_API,
  UPDATE_BOOK_API,
  ALL_USERS_API,
  DELETE_USER,
  DELETE_REQUEST_API,
  REQUEST_STATUS_UPDATE_API,
  USER_COMMET_API,
  USER_COMMENT_DELETE_API,
  USER_COMMENT_UPDATE_API,
  BUY_RENT_API,
  HOME_BOOK_API,
};
