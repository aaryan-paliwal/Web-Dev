const ActivityLog = require("../models/ActivityLog");

const logActivity = async (userId, action, metadata = {}) => {
  try {
    await ActivityLog.create({
      userId,
      action,
      metadata,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};

module.exports = logActivity;



