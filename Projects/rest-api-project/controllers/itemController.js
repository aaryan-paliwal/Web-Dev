const Item = require("../models/item");
const canAccessItem = require("../utils/canAccessItem");
const logActivity = require("../utils/logActivity");

exports.getItems = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const query = req.user.role === "admin"
      ? {}
      : { userId: req.user.userId };

    const items = await Item.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const results = req.user.role === "admin"
      ? items.map(item => {
          const obj = item.toObject();
          obj.isOwner = item.userId.toString() === req.user.userId;
          return obj;
        })
      : items;

    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const canAccess = canAccessItem(req.user, item);
    if (!canAccess) return res.status(403).json({ message: "Forbidden" });

    const itemData = item.toObject();
    if (req.user.role === "admin") {
      itemData.isOwner = item.userId.toString() === req.user.userId;
    }

    res.json(itemData);
  } catch (err) {
    next(err);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const item = new Item({
      name,
      quantity,
      userId: req.user.userId,
      createdByRole: req.user.role
    });

    await item.save();

    // ✅ Fixed: pass userId and action
    await logActivity(req.user.userId, "CREATE_ITEM", { itemId: item._id });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const isOwner = item.userId.toString() === req.user.userId;

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({ message: "Access denied. You can only update your own items." });
    }

    const updated = await Item.findByIdAndUpdate(id, req.body, { new: true });

    // ✅ Fixed: pass userId and action
    await logActivity(req.user.userId, "UPDATE_ITEM", { itemId: updated._id });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const isOwner = item.userId.toString() === req.user.userId;

    if (req.user.role !== "admin" && !isOwner) {
      return res.status(403).json({ message: "Access denied. Admins or owners only." });
    }

    await item.deleteOne();

    // ✅ Fixed: pass userId and action
    await logActivity(req.user.userId, "DELETE_ITEM", { itemId: item._id });

    res.json({ message: "Item deleted" });
  } catch (err) {
    next(err);
  }
};


