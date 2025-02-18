const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS
app.use(cors()); // Allow all origins
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error: ", err));

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt:', username, password);

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: "User not found" });
        }

        console.log('Stored hashed password:', user.password);
        console.log('Password entered:', password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', isMatch);

        if (!isMatch) {
            console.log('Invalid credentials');
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token);
        res.json({ message: "Login successful", token });

    } catch (err) {
        console.log('Server error:', err);
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
