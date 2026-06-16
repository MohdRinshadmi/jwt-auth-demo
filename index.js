require("dotenv").config(); // ✅ Load env vars at the top

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const users = require("./users");
const verifyToken = require("./middleware/auth");

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY; // ✅ Loaded from .env

app.use(bodyParser.json());

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("username, password: ", username, password);

  const user = users.find((u) => u.username === username); // ✅ compare with input
  const isMatch = await bcrypt.compare(password, user.password); // bcrypt is a hashing library, when we put value database then only we need to compare with database.
  // const isMatch = password == user.password
  console.log("isMatch: ", isMatch);
  if (!user || !isMatch) return res.status(404).json({ msg: "user not found" });
  // console.log("req, res: ", req, res);
  console.log("user ", user);

  if (isMatch && user)
    return res.status(200).json({ msg: "User successfully logged in" });

  // create JWT
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

  res.json({ token });
});

// Protected Route using middleware
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

app.use((req, res) => {
  res.status(200).json("Welcome to the application. No such API");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
