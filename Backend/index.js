require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const DBConnect = require("./config/DB");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const cors = require('cors')
app.use(cookieParser());

app.use(cors())
DBConnect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/allusers", async (req, res) => {
  try {
    const user = await User.find();
    res.status(201).json({ users: user });
  } catch (err) {
    res.status(500).json({ Error: "internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(401).json({ error: "credentials are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });
    await user.save();
    res.status(201).json({ user: user, Token: token });
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send("credentials are required");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Email or Password Wrong" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ Error: "Wrong password" });
    }
    res
      .status(201)
      .json({ name: user.name, email: user.email, password: user.password });
  } catch (err) {
    res.status(500).json({ Error: "internal server error" });
  }
});

app.get("/protected", auth, (req, res) => {
  res.send(`welcome ${req.user.email}`);
});

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
