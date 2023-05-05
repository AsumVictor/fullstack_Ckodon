const Review = require("../models/review");
const Honor = require("../models/honor");
const User = require("../models/undergrad_student");
const asyncHandler = require("express-async-handler");
const Activity = require("../models/activity");
const Aid = require("../models/aid");
const Essay = require("../models/essay");
const Recommendation = require("../models/recommendation");
const review = require("../models/review");

//get all reviews
const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().lean().sort({ updatedAt: -1 });
  // If no undergradute Applicant
  if (!reviews?.length) {
    return res.status(400).json({ message: "No Reviews found" });
  }

  const reviewWithUserAndDoc = await Promise.all(
    reviews.map(async (review) => {
      const user = await User.findById(review.user)
        .select("-password")
        .lean()
        .exec();
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
        student: { ...user },
        document,
      };
    })
  );

  res.json(reviewWithUserAndDoc);
});

const addNewReview = asyncHandler(async (req, res) => {
  const { deadline, status, documentId, onModel, user } = req.body;

  // Confirm data

  const anyEmptyField = !user || !status || !documentId || !onModel;

  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist
  const student = await User.findById(user).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate title
  let Document;
  switch (onModel) {
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

  //Check if the Activity and its ID exist

  const foundDocument = await Document.findOne({ user: user, _id: documentId });
  if (!foundDocument) {
    return res
      .status(400)
      .json({ message: "Invalid document or user not own this document" });
  }

  const duplicate = await Review.findOne({ user: user, documentId: documentId })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({
      message: "It seems you have have submitted this document before",
    });
  }

  // Create and store the new user
  const review = await Review.create({
    deadline,
    status,
    documentId,
    onModel,
    user,
  });

  if (review) {
    // Created
    return res.status(201).json({ message: "You have submitted successfully" });
  } else {
    return res.status(400).json({ message: "Invalid  data received" });
  }
});

const updateReview = asyncHandler(async (req, res) => {
  const { deadline, status, document, model, user } = req.body;

  const anyEmptyField = !document || !status || !model;

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const review = await Review.findOne({
    user: user,
    documentId: document,
    onModel: model,
  }).exec();

  if (!review) {
    return res.status(400).json({ message: "Reviewed document not found" });
  }

  review.status = status;
  review.deadline = deadline;

  const updatedReview = await review.save();
  if (updatedReview) {
    res.status(200).json({ message: `Review updated succesfully`, isSuccess: true });
  } else {
    res.json({ message: `failed to update` });
  }
});

const deleteReview = asyncHandler(async (req, res) => {

  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "All fields required" });
  }

  const review = await Review.findOne({documentId: id}).exec();

  if (!review) {
    return res.status(400).json({ message: "Review not found" });
  }

  const result = await review.deleteOne();
  if(result){
    return res.status(200).json({ message: "Deleted " });
  }

});

module.exports = {
  getAllReviews,
  addNewReview,
  updateReview,
  deleteReview,
};
