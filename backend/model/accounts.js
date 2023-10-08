const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  firstname: {
    type: String,
    default: "First Name",
  },
  lastname: {
    type: String,
    default: "Last Name",
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    default: "Phone",
  },
  address: {
    type: String,
    default: "Address",
  },
  request: [
    {
      bookname: { type: String },
      authorname: { type: String },
      isbn: { type: String },
      language: { type: String },
      status: { type: String, default: "Pending" },
    },
  ],
  comments: [
    {
      bookId: { type: String },
      bookname: { type: String },
      authorname: { type: String },
      comment: { type: String },
      commentedAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  info: [
    {
      bookId: { type: String },
      bookName: { type: String },
      genre: { type: String },
      language: { type: String },
      authorName: { type: String },
      isbn: { type: String },
      bought: { type: Number,default:0 },
      rented: { type: Number, default:0 },
      // buy or rent
      date: {
        type: Date,
        default: new Date(),
      },    },
  ],

  role: {
    type: String,
    default: "user",
  },
  registeredAt: {
    type: Date,
    default: new Date(),
  },
});

accountSchema.post("validate", function (error, doc, next) {
  if (error) {
    next(error);
  } else {
    next();
  }
});

const accountModel = mongoose.model("accounts", accountSchema);

module.exports = accountModel;
