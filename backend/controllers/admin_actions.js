const bookData = require("../model/books");
const userData = require("../model/accounts");
const jwt = require("jsonwebtoken");


// const add_book = async (req, res) => {
//   try {
//     const bookDetails = req.body;
    

//     const existingBookWithISBN = await bookData.findOne({
//       isbn: bookDetails.isbn,
//     });
//     if (existingBookWithISBN) {
//       return res
//         .status(200)
//         .json({ message: "A book with the same ISBN number already exists." });
//     }

//     const existingBookWithSameName = await bookData.findOne({
//       bookname: bookDetails.bookname,
//     });
//     if (existingBookWithSameName) {
//       return res
//         .status(200)
//         .json({ message: "A book with the same name already exists." });
//     }

//     const newBook = new bookData(bookDetails);
//     await newBook.save();

//     res.status(201).json({ message: "Book added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Unable to add details to the database" });
//   }
// };

const add_book = async (req, res) => {
  try {
    const bookDetails = req.body;
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Verify the JWT token
    jwt.verify(token, "thebookspot", async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      // Check for token expiration
      if (decoded.exp <= Date.now() / 1000) {
        return res.status(401).json({ message: "Token has expired" });
      }

      // Continue with adding the book
      const existingBookWithISBN = await bookData.findOne({
        isbn: bookDetails.isbn,
      });
      if (existingBookWithISBN) {
        return res
          .status(200)
          .json({ message: "A book with the same ISBN number already exists." });
      }

      const existingBookWithSameName = await bookData.findOne({
        bookname: bookDetails.bookname,
      });
      if (existingBookWithSameName) {
        return res
          .status(200)
          .json({ message: "A book with the same name already exists." });
      }

      const newBook = new bookData(bookDetails);
      await newBook.save();

      res.status(201).json({ message: "Book added successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add details to the database" });
  }
};


// const book_details = async (req, res) => {
//   try {
//     const id = req.params.id;
//     let data;

//     if (id) {
//       data = await bookData.findById(id);
//     } else {
//       data = await bookData.find();
//     }

//     if (!data) {
//       return res.status(404).json({ message: "Data not found" });
//     }

//     res.status(200).json({
//       message: "Data fetched successfully",
//       data: data,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Unable to fetch details from the database" });
//   }
// };

const book_details = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.params.token;

    if (!token) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Verify the JWT token
    jwt.verify(token, "thebookspot", async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      // Check for token expiration
      if (decoded.exp <= Date.now() / 1000) {
        return res.status(401).json({ message: "Token has expired" });
      }

      let data;

      if (id) {
        data = await bookData.findById(id);
      } else {
        data = await bookData.find();
      }

      if (!data) {
        return res.status(404).json({ message: "Data not found" });
      }

      // If everything is okay, send the data
      res.status(200).json({
        message: "Data fetched successfully",
        data: data,
      });
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Unable to fetch details from the database" });
  }
};


const delete_books = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await bookData.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(200).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ message: "Unable to delete book details from database" });
  }
};

const update_book = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedBook = {
      bookname: req.body.bookname,
      genre: req.body.genre,
      language: req.body.language,
      publicationyear: req.body.publicationyear,
      rentalperiod: req.body.rentalperiod,
      availability: req.body.availability,
      authorname: req.body.authorname,
      isbn: req.body.isbn,
      imageurl: req.body.imageurl,
      stock: req.body.stock,
      description: req.body.description,
      price: req.body.price,
    };

    const updatedResult = await bookData.findByIdAndUpdate(id, updatedBook);

    if (!updatedResult) {
      return res.status(200).json({ message: "Book not found" });
    }

    res.status(201).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res
      .status(500)
      .json({ message: "Unable to update book details in the database" });
  }
};

// const all_users = async (req, res) => {
//   try {
//     const users = await userData.find();

//     if (!users || users.length === 0) {
//       return res.status(404).send("No users found");
//     }

//     res.status(200).json({
//       message: "Users fetched successfully",
//       users: users,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving users");
//   }
// };

const all_users = async (req, res) => {
  try {
    const token = req.params.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    // Verify the JWT token
    jwt.verify(token, "thebookspot", async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Unauthorized user" });
      }

      // You can add additional authorization logic here if needed.

      const users = await userData.find();

      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

      res.status(200).json({
        message: "Users fetched successfully",
        users: users,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};


const delete_user = async (req, res) => {
  try {
    const id = req.params.id;
    const userInfo = await userData.findById(id);

    if (!userInfo) {
      return res.status(200).json({ message: "User not found" });
    }
    for (const comment of userInfo.comments) {
      const bookId = comment.bookId;

      const bookInfo = await bookData.findById(bookId);

      if (!bookInfo) {
        continue;
      }

      const bookCommentIndex = bookInfo.comments.findIndex(
        (bookComment) => bookComment.userId.toString() === id
      );

      if (bookCommentIndex !== -1) {
        bookInfo.comments.splice(bookCommentIndex, 1);

        await bookInfo.save();
      }
      const bookActiviyIndex = bookInfo.activity.findIndex(
        (activity) => activity.id.toString() === id
      );
      if (bookActiviyIndex !== -1) {
        bookInfo.activity.splice(bookActiviyIndex, 1);

        await bookInfo.save();
      }
    }

    const deletedUser = await userData.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(200).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ message: "Unable to delete user details from database" });
  }
};

const delete_request = async (req, res) => {
  try {
    const userId = req.params.id;
    const requestId = req.params.reqId;
    const user = await userData.findById(userId);

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const requestIndex = user.request.findIndex((req) =>
      req._id.equals(requestId)
    );

    if (requestIndex === -1) {
      return res.status(200).json({ message: "Request not found" });
    }

    user.request.splice(requestIndex, 1);

    await user.save();
    res.status(201).json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    res.status(500).json({ message: "Error deleting request" });
  }
};

const update_request_status = async (req, res) => {
  try {
    const userId = req.params.id;
    const requestId = req.params.reqId;

    // Use Mongoose to find the user by ID
    const user = await userData.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use Mongoose to update the request status by its ID
    const updatedUser = await userData.findByIdAndUpdate(
      userId,
      {
        $set: { "request.$[elem].status": "Added" },
      },
      {
        arrayFilters: [{ "elem._id": requestId }],
        new: true, // Return the updated user
      }
    );

    if (!updatedUser) {
      return res.status(200).json({ message: "Request not found" });
    }

    res.status(201).json({
      message: "Request status updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Error updating request status" });
  }
};

module.exports = {
  add_book,
  book_details,
  delete_books,
  update_book,
  all_users,
  delete_user,
  delete_request,
  update_request_status,
};
