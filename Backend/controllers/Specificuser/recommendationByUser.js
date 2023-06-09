const Recommendation = require("../../models/recommendation");
const User = require("../../models/undergrad_student");
const asyncHandler = require("express-async-handler");

//get Recommendation by Id

const getRecommendationOfUser = asyncHandler(async (req, res) => {
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

  const recommendations = await Recommendation.findOne({ user: userId }).lean().exec();

console.log(userId)

  res.json(recommendations);

  // Create and store the new user
});

module.exports = {
  getRecommendationOfUser,
};
