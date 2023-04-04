const UndergraduteApplicant = require("../models/undergraduateApplicant");
const asyncHandler = require("express-async-handler");

//get all users
const getAllUndergraduateApplicants = asyncHandler(async (req, res) => {
  const undergraduteApplicant = await UndergraduteApplicant.find().lean();
  // If no undergradute Applicant
  if (!undergraduteApplicant?.length) {
    return res.status(400).json({ message: "No applicant found" });
  }

  res.json(undergraduteApplicant);
});

const addNewApplicant = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    residence,
    role,
    recentSchool,
    applicationStatus,
    dateOfBirth,
    currentUniversity,
    yearOfCompletion,
    wassceText,
    essayQuestion,
    essayAnswer,
    phone,
    gender,
  } = req.body;

  // Confirm data

  const anyEmptyField =
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !role ||
    !recentSchool ||
    !applicationStatus ||
    !dateOfBirth ||
    !yearOfCompletion ||
    !wassceText ||
    !essayQuestion ||
    !essayAnswer ||
    !gender;

  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  const duplicate = await UndergraduteApplicant.findOne({ email })
    .lean()
    .exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems you have already applied" });
  }

  // Create and store the new user
  const undergraduteApplicant = await UndergraduteApplicant.create({
    firstName,
    lastName,
    email,
    residence,
    role,
    recentSchool,
    applicationStatus,
    dateOfBirth,
    currentUniversity,
    yearOfCompletion,
    wassceText,
    essayQuestion,
    essayAnswer,
    phone,
    gender,
  });

  if (undergraduteApplicant) {
    // Created
    return res
      .status(201)
      .json({ message: "Your application has been submitted successfuly" });
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

module.exports = {
    getAllUndergraduateApplicants,
    addNewApplicant,
}