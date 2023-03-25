const express = require("express");
const userroute = express.Router();
const { Usermodle } = require("../model/usermodel");
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');


userroute.post("/reg", async (req, res) => {
  const { username, email, pass } = req.body;
  const existmail = await Usermodle.findOne({ email })
  try {
    if (existmail) {
      res.send("already exit")
    } else {
      bcrypt.hash(pass, 5, async (err, hash) => {
        const user = new Usermodle({ username, email, pass: hash });
        await user.save();
        // console.log(user)
      });
      res.send({ msg: "registration success" })
    }

  } catch (err) {
    res.send({ msg: "error message" })
  }
})
userroute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await Usermodle.findOne({ email });
    console.log(user._id)
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          //  const token= jwt.sign({ "userid":user._id}, 'shhhhh');
          res.send({ msg: "login", "token": jwt.sign({ "userid": user._id }, 'shhhhh'), "username": user.username })
        }
      })
    } else {
      res.send({ msg: "please register" })
    }

  } catch (err) {
    res.send({ msg: "errormsg" })
  }
})

module.exports = {
  userroute
}