const Recommendation = require("../models/recommendation");
const User = require("../models/undergrad_student");
const Review = require("../models/review");
const asyncHandler = require("express-async-handler");

//get all users
const getRecommendations = asyncHandler(async (req, res) => {
  const recommendation = await Recommendation.find().lean().sort({ createdAt: -1 });
  // If no undergradute Applicant
  if (!recommendation?.length) {
    return res.status(400).json({ message: "No recommendations found" });
  }
  res.json(recommendation);
});

const addNewRecommendation = asyncHandler(async (req, res) => {
  const { user, status, submitted, recommendations, submittedBefore, link } = req.body;

  // Confirm data

  const anyEmptyField =
    !user || !status || !typeof submitted == 'boolean' || !Array.isArray(recommendations) || !typeof submittedBefore == 'boolean'
    

  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist

  const student = await User.findById(user).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "user not found" });
  }
  // Check for duplicate title

  const duplicate = await Recommendation.findOne({ user: user }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems you have already created an recommendation" });
  }

  // Create and store the new user

  const recommendation = await Recommendation.create({
    user,
    status,
    submitted,
    recommendations,
    submittedBefore,
    link
  });

  if (recommendation) {
    // Created
    return res.status(201).json({ message: "Recommendation created successfully", isSuccess:true });
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

const updateRecommendation = asyncHandler(async (req, res) => {
  const { id, status, submitted, recommendations, submittedBefore, link } = req.body;

  const anyEmptyField = !status || !typeof submitted == 'boolean' || !Array.isArray(recommendations) || !typeof submittedBefore == 'boolean' 

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const recommendation = await Recommendation.findById(id).exec();

  if (!recommendation) {
    return res.status(400).json({ message: "Recommendation not found" });
  }

  //check duplicate
  const duplicate = await Recommendation.findOne({ id }).lean().exec();
  //allow   original applicant
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Recommendation already exist" });
  }
  recommendation.status = status;
  recommendation.submitted = submitted;
  recommendation.recommendations = recommendations;
  recommendation.submittedBefore = submittedBefore;
  recommendation.link = link
  const updatedRecommendation = await recommendation.save();
  if (updatedRecommendation) {
    res.json({ message: `recommendation updated succesfully` , isSuccess: true});
  }else{
    res.json({ message: `failed to update` });

  }
});

const deleteRecommendation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Recommendation ID required" });
  }

  const recommendation = await Recommendation.findById(id).exec();
  if (!recommendation) {
    return res.status(400).json({ message: "Recommendation not found" });
  }
  const hasReview = await Review.findOne({documentId: recommendation._id}).exec();

  if(hasReview){
    return res.status(409).json({ message: "You can delete a submitted document" });

  }
  
  const result = await recommendation.deleteOne();
  const reply = `Recommendation has been deleted`;

  res.json(reply);
});

module.exports = {
  getRecommendations,
  addNewRecommendation,
  updateRecommendation,
  deleteRecommendation,
};
