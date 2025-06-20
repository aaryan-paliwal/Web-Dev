const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = 3000;

// MongoDB URI from .env
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Middleware
app.use(express.json()); // To parse JSON

// MongoDB Connection
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}
connectDB(); // Start connection

// Test route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Example: fetch all documents from a collection
app.get("/data", async (req, res) => {
  try {
    const db = client.db("test"); // use your database name
    const collection = db.collection("demo"); // use your collection name
    const data = await collection.find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

