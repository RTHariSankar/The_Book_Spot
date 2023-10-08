const userData = require("../model/accounts");
const bookData = require("../model/books");
const { encryptMessage, decryptMessage } = require("../functions/crypto");
const jwt = require('jsonwebtoken')

const userInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const userInfo = await userData.findById(id);

    if (!userInfo) {
      return res.status(404).send("User not found");
    }

    const decryptedPassword = decryptMessage(userInfo.password);
    const decryptedPhone = decryptMessage(userInfo.phone);
    const decryptedAddress = decryptMessage(userInfo.address);

    res.status(200).json({
      message: "Data fetched successfully",
      info: userInfo,
      password: decryptedPassword,
      phone: decryptedPhone,
      address: decryptedAddress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving userInfo");
  }
};

const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProfile = {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        name: req.body.name,
        email: req.body.email,
        password: encryptMessage(req.body.password),
        phone: encryptMessage(req.body.phone),
        address: encryptMessage(req.body.address),
      },
    };
    // const updatedProfile = {$set:req.body};

    await userData.findByIdAndUpdate(id, updatedProfile);

    res.status(200).json({ message: "Profile Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Profile update failed" });
  }
};

// const userRequest = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const requestISBN = req.body.isbn;
//     const userInfo = await userData.findById(id);

//     if (!userInfo) {
//       return res.status(404).send("User not found");
//     }

//     const requestExists = userInfo.request.some(
//       (request) => request.isbn === requestISBN
//     );

//     if (requestExists) {
//       return res.json({
//         message: "Book request already made and under admin's scrutiny",
//       });
//     } else {
//       userInfo.request.push(req.body);

//       await userInfo.save();

//       res.json({ message: "Book request added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Request action failed" });
//   }
// };

const userRequest = async (req, res) => {
  try {
    const token = req.params.token;
    const id = req.params.id;
    const requestISBN = req.body.isbn;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Verify the JWT token
    jwt.verify(token, "thebookspot", async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      // You can add additional authorization logic here if needed.

      const userInfo = await userData.findById(id);

      if (!userInfo) {
        return res.status(404).json({ message: "User not found" });
      }

      const requestExists = userInfo.request.some(
        (request) => request.isbn === requestISBN
      );

      if (requestExists) {
        return res.json({
          message: "Book request already made and under admin's scrutiny",
        });
      } else {
        userInfo.request.push(req.body);

        await userInfo.save();

        res.json({ message: "Book request added successfully" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Request action failed" });
  }
};


const userComments = async (req, res) => {
  try {
    const userId = req.params.id;
    const bookId = req.body.bookId;
    const commentText = req.body.comment;
    const userInfo = await userData.findById(userId);
    const bookInfo = await bookData.findById(bookId);

    if (!userInfo) {
      return res.status(200).json({ message: "User not found" });
    }

    if (!bookInfo) {
      return res.status(200).json({ message: "Book not found" });
    }

    const bookIdToAdd = req.body.bookId;

    if (userInfo.comments.some((comment) => comment.bookId === bookIdToAdd)) {
      return res.status(200).json({
        message:
          "You have already commented. Each user can only submit one comment for a particular book.",
      });
    }

    const newComment = {
      userId: userInfo._id,
      userEmail: userInfo.email,
      comment: commentText,
    };

    userInfo.comments.push(req.body);
    await userInfo.save();

    bookInfo.comments.push(newComment);
    await bookInfo.save();

    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("User Comments Error:", error);
    res.status(500).json({ error: "Comment action failed" });
  }
};

const delete_user_comment = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    const commentText = req.body.commentText;

    const userInfo = await userData.findById(userId);
    const bookInfo = await bookData.findById(bookId);

    if (!userInfo || !bookInfo) {
      return res.status(200).json({ message: "User or book not found" });
    }

    const userCommentIndex = userInfo.comments.findIndex(
      (comment) => comment.bookId === bookId && comment.comment === commentText
    );

    const bookCommentIndex = bookInfo.comments.findIndex(
      (comment) =>
        comment.userId.toString() === userId && comment.comment === commentText
    );

    if (userCommentIndex !== -1 && bookCommentIndex !== -1) {
      userInfo.comments.splice(userCommentIndex, 1);
      bookInfo.comments.splice(bookCommentIndex, 1);

      await userInfo.save();
      await bookInfo.save();

      return res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      return res.status(200).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ error: "Comment deletion failed" });
  }
};

const update_comment = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    const oldCommentText = req.body.oldCommentText;
    const newCommentText = req.body.newCommentText;

    const userInfo = await userData.findById(userId);
    const bookInfo = await bookData.findById(bookId);

    if (!userInfo || !bookInfo) {
      return res.status(200).json({ message: "User or book not found" });
    }

    const userCommentIndex = userInfo.comments.findIndex(
      (comment) =>
        comment.bookId === bookId && comment.comment === oldCommentText
    );

    const bookCommentIndex = bookInfo.comments.findIndex(
      (comment) =>
        comment.userId.toString() === userId &&
        comment.comment === oldCommentText
    );

    if (userCommentIndex !== -1 && bookCommentIndex !== -1) {
      userInfo.comments[userCommentIndex].comment = newCommentText;
      bookInfo.comments[bookCommentIndex].comment = newCommentText;

      await userInfo.save();
      await bookInfo.save();

      return res.status(200).json({ message: "Comment updated successfully" });
    } else {
      return res.status(200).json({ message: "Comment not found" });
    }
  } catch (error) {
    console.error("Update Comment Error:", error);
    res.status(500).json({ error: "Comment deletion failed" });
  }
};

const userBookInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userData.findById(id);

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const action = req.body.action;
    const { bookId, bookName, genre, language, authorName, isbn } = req.body;

    const book = await bookData.findById(bookId);

    if (!book) {
      return res.status(200).json({ message: "Book not found" });
    }
    if (book.availability === "Out of stock") {
      return res.status(200).json({ message: "Book out of stock" });
    }

    const existingUserInfo = user.info.find((info) => info.bookId === bookId);

    const existingBookActivity = book.activity.find((item) => item.id === id);

    if (existingUserInfo && existingBookActivity) {
      existingUserInfo.date = new Date();
      existingUserInfo[action] += 1;
      existingBookActivity.date = new Date();
      existingBookActivity[action] += 1;
      book[action] += 1;
    } else {
      const newUserBookInfo = {
        bookId,
        bookName,
        genre,
        language,
        authorName,
        isbn,
        bought: action === "bought" ? 1 : 0,
        rented: action === "rented" ? 1 : 0,
        action,
        date: new Date(),
      };
      const activity = {
        id: user._id,
        username: user.name,
        email: user.email,
        rented: action === "rented" ? 1 : 0,
        bought: action === "bought" ? 1 : 0,
        date: new Date(),
      };

      user.info.push(newUserBookInfo);
      book.activity.push(activity);
      book[action] += 1;
    }

    book.stock -= 1;

    if (book.stock === 0) {
      book.availability = "Out of stock";
    }

    await book.save();
    await user.save();

    res.json({ message: "Info added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Info action failed" });
  }
};

const home_book_details = async (req, res) => {
  try {
    const id = req.params.id;
    let data;

    if (id) {
      data = await bookData.findById(id);
    } else {
      data = await bookData.find();
    }

    if (!data) {
      return res.status(200).json({ message: "Data not found" });
    }

    res.status(200).json({
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to fetch details from the database" });
  }
};

module.exports = {
  userInfo,
  userUpdate,
  userRequest,
  userComments,
  delete_user_comment,
  update_comment,
  userBookInfo,
  home_book_details
};
