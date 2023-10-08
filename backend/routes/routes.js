const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const {
  userInfo,
  userUpdate,
  userRequest,
  userComments,
  delete_user_comment,
  update_comment,
  userBookInfo,
  home_book_details,
} = require("../controllers/user_actions");
const {
  add_book,
  book_details,
  delete_books,
  update_book,
  all_users,
  delete_user,
  delete_request,
  update_request_status,
} = require("../controllers/admin_actions");

router.post("/login", login);
router.post("/register", register);

router.get("/userInfo/:id", userInfo);
router.put("/userUpdate/:id", userUpdate);
router.put("/userRequest/:id/:token", userRequest);

router.post("/addBook/:token", add_book);
router.get("/bookDetails/:token", book_details);

router.delete("/bookDelete/:id", delete_books);
router.get("/bookDetails/:id/:token", book_details);
router.put("/bookUpdate/:id", update_book);
router.get("/allUsers/:token", all_users);
router.delete("/userDelete/:id", delete_user);
router.delete("/requestDelete/:id/:reqId", delete_request);
router.put("/requestStatusUpdate/:id/:reqId", update_request_status);

router.post("/userComments/:id",userComments)
router.delete("/userComments", delete_user_comment);
router.put("/updateComment", update_comment);

router.put('/userBookInfo/:id',userBookInfo);
router.get("/homeBookDetails", home_book_details);

module.exports = router;
