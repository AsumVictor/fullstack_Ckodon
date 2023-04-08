const Honor = require("../../models/honor");
const Review = require("../../models/review");
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

  const reviews = await Review.find({ user: userId }).lean().exec();
  if (!reviews) {
    return res.status(400).json({ message: "No reviews found" });
  }
  const reviewWithDoc = await Promise.all(
    reviews.map(async (review) => {
      let Document;
      switch (review.onModel) {
        case "Honor":
          Document = Honor;
          break;
        case "Activity":
          Document = Activity;
          break;
        case "Aid":
          Document = Aid;
          break;
        case "Essay":
          Document = Essay;
          break;
        case "Recommendation":
          Document = Recommendation;
          break;
        default:
          return res.status(400).json({ error: "Invalid document model" });
      }
      const document = await Document.findById(review.documentId);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      return { ...review, document };
    })
  );

  res.json(reviewWithDoc);

  // Create and store the new user
});

module.exports = {
  getHonorOfUser,
};
