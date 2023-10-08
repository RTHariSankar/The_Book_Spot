const { decryptMessage } = require("../functions/crypto");
const loginData = require("../model/accounts");
const jwt = require('jsonwebtoken');


// const login = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const user = await loginData.findOne({ email: email });

//     if (!user) {
//       return res.json({ message: "User not found, Please register" });
//     } else {
//       const decryptedPassword = decryptMessage(user.password);

//       if (password === decryptedPassword) {
//         res.json({
//           message: "Login successful",
//           data: user,
//         });
//       } else {
//         res.json({ message: "Incorrect password" });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Something went wrong. Please try again later." });
//   }
// };
const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await loginData.findOne({ email: email });

    if (!user) {
      return res.json({ message: "User not found, Please register" });
    } else {
      const decryptedPassword = decryptMessage(user.password);

      if (password === decryptedPassword) {
        jwt.sign(
          {
            email: email,
            id: user._id,
          },
          "thebookspot",
          { expiresIn: "1d" },
          (error, token) => {
            if (error) {
              res.json({ message: "Token not generated" });
            } else {
              res.json({
                message: "Login successful",
                token: token,
                data: user,
              });
            }
          }
        );
      } else {
        res.json({ message: "Incorrect password" });
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

module.exports = { login };
