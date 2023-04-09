const Essay = require("../../models/essay");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

//get Essay by Id

const getEssayOfUser = asyncHandler(async (req, res) => {
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

  const essays = await Essay.find({ user: userId }).lean().exec();
  if (!essays) {
    return res.status(400).json({ message: "No essays found" });
  }


  res.json(essays);

  // Create and store the new user
});

module.exports = {
  getEssayOfUser,
};
