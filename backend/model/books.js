const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookname: { type: String, required: [true, "bookname is required"] },
  genre: { type: String, required: [true, "genre is required"] },
  language: { type: String, required: [true, "language is required"] },
  publicationyear: {
    type: String,
    required: [true, "publication year is required"],
  },
  rentalperiod: { type: String, required: [true, "rental period is required"] },
  availability: { type: String, required: [true, "availability is required"] },
  authorname: { type: String, required: [true, "authorname is required"] },
  isbn: { type: String, required: [true, "isbn is required"] },
  imageurl: { type: String, required: [true, "imageurl is required"] },
  stock: { type: Number, required: [true, "count is required"] },
  description: { type: String, required: [true, "Description is required"] },
  price: { type: String, required: [true, "Price is required"] },


  bought: { type: Number, default: 0 },
  rented: { type: Number, default: 0 },

  activity: [
    {
      id: { type: String },
      username: { type: String },
      email: { type: String },
      rented: { type: Number, default: 0 },
      bought: { type: Number, default:0 },
      date: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  comments: [
    {
      userId: { type: String },
      userEmail: { type: String },
      comment: { type: String },
    },
  ],
});

bookSchema.post("validate", function (error, doc, next) {
  if (error) {
    next(error);
  } else {
    next();
  }
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
