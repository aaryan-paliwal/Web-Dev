const express = require("express");
const router = express.Router();
const {
  getAllData,
  getOneData,
  addData,
  updateData,
  deleteData,
} = require("../controllers/dataController");

// CRUD Routes
router.get("/", getAllData);
router.get("/:id", getOneData);
router.post("/", addData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;

