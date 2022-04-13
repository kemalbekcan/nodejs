const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const auth = require("../middlewares/auth");

// @route   Get api/auth
// @desc    Test route
// @access  Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error !");
  }
});

// @route   POST api/users
// @desc    Register User
// @access  Public

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
      let user = await User.findOne({ email })
      if (user) {
          return res.status(400).json({ errors: [{ msg: 'User already exist' }] })
      }

      user = new User({
          email,
          password
      })

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
          user: {
              id: user.id
          }
      }

      jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token })
      });
  } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error !');
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
