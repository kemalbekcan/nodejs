const express = require("express");
const router = express.Router();
const sequelize = require("../database");
const Contact = require("../models/contact");
sequelize.sync();

router.get("/", (req, res) => {
  Contact.findAll({})
    .then(function (contact) {
      res.send({ error: false, message: "contact list", data: contact });
    })
    .catch(function (err) {
      console.log("Oops! something went wrong, : ", err);
    });
});

module.exports = router;
