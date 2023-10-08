// Add_Book.jsx
// Update_Book.jsx

const validationRulesBook = {
  bookname: {
    required: "*this field is required",
  },
  genre: {
    required: "*this field is required",
  },
  language: {
    required: "*this field is required",
  },
  publicationyear: {
    required: "*this field is required",
  },
  rentalperiod: {
    required: "*this field is required",
  },
  availability: {
    required: "*this field is required",
  },
  authorname: {
    required: "*this field is required",
  },
  isbn: {
    required: "*this field is required",
  },
  imageurl: {
    required: "*this field is required",
  },
  stock: {
    required: "*this field is required",
  },
  description: {
    required: "*this field is required",
  },
  price: {
    required: "*this field is required",
  },
};

// Profile.jsx
// User_Details.jsx

const validationRulesProfile = {
  firstname: {
    required: "First name is required",
  },
  lastname: {
    required: "Last name is required",
  },
  name: {
    required: "User is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      message: "Minimum 8 characters, upper and lowercase, digits required",
    },
  },

  confirmPassword: {
    required: "Password confirmation is required",
  },
  phone: {
    required: "Phone no. is required",
    pattern: {
      value: /^(?:\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4})$/,
      message: "Enter a valid phone number",
    },
  },
  address: {
    required: "Address is required",
  },
};

// SignInUp.jsx

const validationRulesLogin = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      message: "Minimum 8 characters, upper and lowercase, digits required",
    },
  },
};

const validationRulesRegistration = {
  name: {
    required: "Name is required",
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      message: "Invalid email format",
    },
  },
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      message: "Minimum 8 characters, upper and lowercase, digits required",
    },
  },
  // password: {
  //   required: "Password is required",
  //   value: [
  // {
  //   pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  //   message: "Minimum 8 characters, upper and lowercase, digits required",
  // },
  //   {
  //     value: /^(?![A-Z]{8,}$).*$/, // Example: Minimum 12 characters
  //     message: "Weak Password: only uppercase not allowed",
  //   },
  //   {
  //     value: /^(?! [a-z]{8,}$).*$/, // Example: Minimum 12 characters
  //     message: "Weak Password: only lowercase not allowed",
  //   },
  //   {
  //     value: /^(?!\d{8,}).*$/, // Example: Minimum 12 characters
  //     message: "Weak Password: only digits not allowed",
  //   },
  //   {
  //     value: /^(?![A-Z\d]{8,}).*$/, // Example: Minimum 12 characters
  //     message: "Medium strength: no uppercase letters present",
  //   },
  //   {
  //     value: /^(?!(?=.*[a-zA-Z]).{8,}).*$/, // Example: Minimum 12 characters
  //     message: "Medium strength: no digits present",
  //   },
  // ],
  confirmPassword: {
    required: "Password confirmation is required",
  },
};


module.exports = { validationRulesBook, validationRulesProfile ,validationRulesLogin , validationRulesRegistration};
