const express = require("express");
const port = 3000;
var cors = require("cors");
var user = require("./routes/user");
var auth = require("./routes/auth");
var contact = require("./routes/contact")
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", auth);

app.use("/api/user", user);

app.use("/api/contact", contact)

app.listen(port, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
