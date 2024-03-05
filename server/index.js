const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.model");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "wdcfgdwdfcgwu533tgdhdfh7353gdghd673dgvgbdh1jws";

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://deepjoysarkar9:SEvPnyn03sfBhRo8@cluster0.0zltaw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json({ message: "User not found" });
  }
  const passOk = bcrypt.compareSync(password, userDoc.password);
 
  if (passOk) {
    //Logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    res.status(400).json("Wrong Credentials");
  }
});

app.listen(4000);
