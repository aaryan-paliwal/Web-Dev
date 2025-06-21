const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const dataRoutes = require("./routes/dataRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ DB connection error", err));

// Routes
app.use("/auth", authRoutes);       // for login and register
app.use("/api", protectedRoutes);   // for protected routes
app.use("/data", dataRoutes); // for data routes


// Default route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


