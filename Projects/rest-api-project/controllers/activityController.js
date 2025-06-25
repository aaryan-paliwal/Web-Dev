const ActivityLog = require("../models/activityLog");

exports.getActivityLogs = async (req, res, next) => {
  try {
    const query = req.user.role === "admin"
      ? {}
      : { userId: req.user.userId };

    const logs = await ActivityLog.find(query)
      .sort({ timestamp: -1 })
      .limit(50); // show latest 50

    res.json(logs);
  } catch (err) {
    next(err);
  }
};


