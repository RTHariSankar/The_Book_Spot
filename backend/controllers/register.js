const loginData = require("../model/accounts");
const { encryptMessage } = require("../functions/crypto");
const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//     try {
//       const email = req.body.email;
//       const user = await loginData.findOne({ email: email });

//       if (user) {
//         return res.json({ message: "Email already registered, please login" });
//       }

//       const newUser = new loginData(req.body);
//       const hashedPassword = encryptMessage(req.body.password);
//       const hashedPhone = encryptMessage(req.body.phone);
//       const hashedAddress = encryptMessage(req.body.address);

//       newUser.password = hashedPassword;
//       newUser.phone = hashedPhone;
//       newUser.address = hashedAddress;

//       await newUser.save();

//       res.status(200).json({ message: "Registration Successful", data: newUser });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "Something went wrong. Please try again later." });
//     }
//   };

const register = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await loginData.findOne({ email: email });

    if (user) {
      return res.json({ message: "Email already registered, please login" });
    }

    const newUser = new loginData(req.body);
    const hashedPassword = encryptMessage(req.body.password);
    const hashedPhone = encryptMessage(req.body.phone);
    const hashedAddress = encryptMessage(req.body.address);

    newUser.password = hashedPassword;
    newUser.phone = hashedPhone;
    newUser.address = hashedAddress;

    await newUser.save();

    jwt.sign(
      {
        email: email,
      },
      "thebookspot",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          res.json({ message: "Token not generated" });
        } else {
          res.json({
            message: "Registration Successful",
            data: newUser,
            token: token,
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

module.exports = { register };
