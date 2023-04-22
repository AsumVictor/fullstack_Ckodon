const Honor = require("../../models/honor");
const User = require("../../models/undergrad_student");
const asyncHandler = require("express-async-handler");

//get Honor by Id

const getHonorOfUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Confirm data

  if (!userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist

  const student = await User.findById(userId).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "User not found" });
  }

  const honors = await Honor.findOne({ user: userId }).lean().exec();
 


  res.json(honors);

  // Create and store the new user
});

module.exports = {
  getHonorOfUser,
};
