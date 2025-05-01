const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bhoomitra', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Define User Schema
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true },
  password: String
}));

// Register
app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ msg: "User registered" });
  } catch (e) {
    res.status(400).json({ msg: "User already exists" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { mobile, password } = req.body;
  const user = await User.findOne({ mobile, password });
  if (!user) return res.status(401).json({ msg: "Invalid credentials" });
  res.json({ name: user.name, mobile: user.mobile });
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
