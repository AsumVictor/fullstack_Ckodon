const Activity = require("../../models/activity");
const User = require("../../models/undergrad_student");
const asyncHandler = require("express-async-handler");

//get Activity by Id

const getActivityOfUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Confirm data
console.log(userId)

  if (!userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist

  const student = await User.findById(userId).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "User not found" });
  }

  const activities = await Activity.findOne({ user: userId }).lean().exec();
  
  res.json(activities);

  // Create and store the new user
});

module.exports = {
  getActivityOfUser,
};
