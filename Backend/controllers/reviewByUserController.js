const Review = require("../models/review");
const Honor = require("../models/honor");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const getReviewByUser = asyncHandler(async (req, res) => {
    const { userId} = req.body;

    if (!userId ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const student = await User.findById(userId).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "User not found" });
  }

    const reviews = await Review.find().lean().sort({ createdAt: -1 });
    // If no undergradute Applicant
    if (!reviews?.length) {
      return res.status(400).json({ message: "No Reviews found" });
    }
  
    const reviewWithUserAndDoc = await Promise.all(
      reviews.map(async (review) => {
        const user = await User.findById(review.user).select("-password").lean().exec();
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
  
        return {
          ...review,
          student:{...user },
         document,
        };
      })
    );
  
    res.json(reviewWithUserAndDoc);
  });
  

  module.exports = {
    getReviewByUser,
  }; 