const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

// Create and export the client
const client = new MongoClient(uri);
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}

module.exports = connectDB;
module.exports = { client, connectDB };

