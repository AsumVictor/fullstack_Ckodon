const Honor = require("../../models/honor");
const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

//get Honor by Id

const getHonorOfUser = asyncHandler(async (req, res) => {
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

  const honors = await Honor.find({ user: userId }).lean().exec();
  if (!honors) {
    return res.status(400).json({ message: "No honors found" });
  }


  res.json(honors);

  // Create and store the new user
});

module.exports = {
  getHonorOfUser,
};
