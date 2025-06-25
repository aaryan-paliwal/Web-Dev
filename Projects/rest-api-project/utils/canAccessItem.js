module.exports = function canAccessItem(reqUser, item) {
  if (reqUser.role === "admin") return true;
  return item.userId.toString() === reqUser.userId;
};

