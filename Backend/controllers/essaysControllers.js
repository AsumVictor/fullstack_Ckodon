const Essay = require("../models/essay");
const User = require("../models/undergrad_student");
const Review = require("../models/review");
const asyncHandler = require("express-async-handler");

//get all users
const getEssays = asyncHandler(async (req, res) => {
  const essay = await Essay.find().lean().sort({ createdAt: -1 });
  // If no undergradute Applicant
  if (!essay?.length) {
    return res.status(400).json({ message: "No essays found" });
  }
  res.json(essay);
});

const addNewEssay = asyncHandler(async (req, res) => {
  const { user, status, submitted, submittedBefore, essays, schoolName, link } =
    req.body;

  // Confirm data

  const anyEmptyField =
    !user ||
    !status ||
    !typeof submitted == "boolean" ||
    !typeof submittedBefore == "boolean" ||
    !Array.isArray(essays) ||
    !schoolName;

  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist

  const student = await User.findById(user).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "user not found" });
  }

  //Check duplicat
  const duplicate = await Essay.findOne({ user: user, schoolName: schoolName })
    .lean()
    .exec();
  if (duplicate) {
    return res.status(409).json({
      message:
        "It seems you have already created an essay with same school Name",
    });
  }
  // Create and store the new user

  const essay = await Essay.create({
    user,
    status,
    submitted,
    submittedBefore,
    essays,
    schoolName,
    link,
  });

  if (essay) {
    // Created
    return res.status(201).json({ message: "Essay created successfully", isSuccess: true });
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

const updateEssay = asyncHandler(async (req, res) => {
  const { id, status, submitted, essays, schoolName, link, submittedBefore } = req.body;

  const anyEmptyField =
    !status ||
    !typeof submitted == "boolean" ||
    !Array.isArray(essays) ||
    !schoolName;

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const essay = await Essay.findById(id).exec();

  if (!essay) {
    return res.status(400).json({ message: "Essay not found" });
  }

  //check duplicate
  const duplicate = await Essay.findOne({ id }).lean().exec();
  //allow   original applicant
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Essay already exist" });
  }
  essay.status = status;
  essay.submitted = submitted;
  essay.essays = essays;
  essay.schoolName = schoolName;
  essay.link = link;
  essay.submittedBefore = submittedBefore;

  const updatedEssay = await essay.save();
  if (updatedEssay) {
    res.json({ message: `essay updated succesfully`, isSuccess: true });
  } else {
    res.json({ message: `failed to update` });
  }
});

const deleteEssay = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "Essay ID required" });
  }

  const essay = await Essay.findById(id).exec();
  if (!essay) {
    return res.status(400).json({ message: "Essay not found" });
  }

  const haveReview = await Review.findOne({ documentId: essay._id });
  if (haveReview) {
    return res
      .status(409)
      .json({ message: "You cannot delete a submitted document" });
  }
  const result = await essay.deleteOne();
  const reply = `Essay has been deleted`;

  res.json(reply);
});

module.exports = {
  getEssays,
  addNewEssay,
  updateEssay,
  deleteEssay,
};
