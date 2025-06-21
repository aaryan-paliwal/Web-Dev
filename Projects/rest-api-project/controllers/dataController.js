const { ObjectId } = require("mongodb");
const { client } = require("../config/db");

const db = () => client.db("test").collection("demo");

exports.getAllData = async (req, res) => {
  try {
    const data = await db().find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

exports.getOneData = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await db().findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch document" });
  }
};

exports.addData = async (req, res) => {
  try {
    const result = await db().insertOne(req.body);
    res.status(201).json({ message: "Added", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Insert failed" });
  }
};

exports.updateData = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db().updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    if (result.matchedCount === 0) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

exports.deleteData = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};



