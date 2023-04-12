const Activity = require("../../models/activity");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

//get Activity by Id

const getActivityOfUser = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Confirm data

  if (!userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist

  const student = await User.findById(userId).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "User not found" });
  }

  const activities = await Activity.find({ user: userId }).lean().exec();
  if (!activities) {
    return res.status(400).json({ message: "No activities found" });
  }


  res.json(activities);

  // Create and store the new user
});

module.exports = {
  getActivityOfUser,
};
