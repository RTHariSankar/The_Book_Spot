const express = require("express");
const morgan = require("morgan");
const app = express();

require("dotenv").config();

const cors = require("cors");
app.use(cors());

app.use(morgan("dev"));
const PORT = process.env.PORT || 5000;

require("./db connection/connection");

// app.use(express.static(path.join(__dirname, "build")));

const router = require("./routes/routes");
app.use("/api", router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// app.get("*", async (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, "build/index.html"));
//   } catch (error) {
//     console.error(error);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
