const express = require("express");
const router = express.Router();
const sequelize = require("../database");
const User = require("../models/User");
sequelize.sync();

router.get("/", (req, res) => {
  User.findAll({})
    .then(function (users) {
      res.send({ error: false, message: "users list", data: users });
    })
    .catch(function (err) {
      console.log("Oops! something went wrong, : ", err);
    });
});

router.post("/", (req, res) => {
  User.create(req.body)
    .then(() => {
      res.send("user added");
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put("/", (req, res) => {
  const user = User.findOne({ id: req.body.id });
});

router.delete("/", (req, res) => {
  User.findOne({ id: req.body })
    .then(() => {})
    .catch((error) => {
      console.log("Something went wrong", error);
    });
});

module.exports = router;
