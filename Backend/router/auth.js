const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

require("../DB/connetions");

const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("hi home from auth");
});

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "fil all entrys" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "passwords are not matching" });
    } else {
      const user = new User({ name, email, password, cpassword });

      const userRegister = await user.save();
      if (userRegister) {
        return res.status(201).json({ message: "RegisteredSucessfully" });
      } else {
        return res.status(500).json({ error: "Registration Failed" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ messege: "Pliss fill data" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ messege: "Invalid Credintial " });
      } else {
        res.status(200).json({ messege: "loggedIn" });
      }
    } else {
      res.status(400).json({ messege: "Invalid Credintial " });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
