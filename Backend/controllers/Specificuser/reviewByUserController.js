const Review = require("../../models/review");
const Honor = require("../../models/honor");
const Activity = require("../../models/activity");
const Aid = require("../../models/aid");
const Essay = require("../../models/essay");
const Recommendation = require("../../models/recommendation")
const User = require("../../models/undergrad_student");
const asyncHandler = require("express-async-handler");

const getReviewByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const student = await User.findById(userId).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "User not found" });
  }

    const reviews = await Review.find({user: userId}).lean().sort({ updatedAt: -1 });

    const reviewWithUserAndDoc = await Promise.all(
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
         console.log(document?._id, review?._id)
         if (!document) {
           return res.status(404).json({ error: "Document not found" });
         }
  
        return {
          ...review,
          document: document
        };
      })
    );
 
    return res.status(200).json(reviewWithUserAndDoc);
  });
  
  const getReviewById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const review = await Review.findById(id).lean()
   
    if (!review) {
      return res.status(400).json({ message: "Invalid Id" });

    }
  
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
        
  let document = await Document.findById(review.documentId).lean()

  let user = await User.findById(review.user).lean()
  
  
    res.json({...review, document, user})
  });

  const getReviewByDocument = asyncHandler(async (req, res) => {
    const { document } = req.params;
    if(!document){
      console.log(document)
      return res.status(400).json({ message: "filled required" });
    }

    const review = await Review.findOne({documentId: document}).lean()
   

    if (!review) {
      return res.status(400).json({ message: "Invalid Id" });

    }

    res.status(200).json(review)
  });

  module.exports = {
    getReviewByUser,
    getReviewById,
    getReviewByDocument
  }; 