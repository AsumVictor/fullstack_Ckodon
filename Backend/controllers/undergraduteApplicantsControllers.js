const UndergraduteApplicant = require("../models/undergraduateApplicant");
const asyncHandler = require("express-async-handler");

//get all users
const getAllUndergraduateApplicants = asyncHandler(async (req, res) => {
  const undergraduteApplicant = await UndergraduteApplicant.find()
    .lean()
    .sort({ createdAt: -1 });
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
    gender,
    phone,
    whatsappNumber,
    level,
  } = req.body;

  // Confirm data

  const anyEmptyField =
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !role ||
    !recentSchool ||
    !dateOfBirth ||
    !gender ||
    !yearOfCompletion ||
    !wassceText ||
    !essayQuestion ||
    !essayAnswer;

  console.log(anyEmptyField);

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
    gender,
    phone,
    whatsappNumber,
    level,
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

const updateApplicant = asyncHandler(async (req, res) => {
  const {
    id,
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

  const anyEmptyField =
    !id ||
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !recentSchool ||
    !gender ||
    !role ||
    !applicationStatus ||
    !dateOfBirth ||
    !currentUniversity ||
    !yearOfCompletion ||
    !wassceText ||
    !essayQuestion ||
    !essayAnswer;

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const applicant = await UndergraduteApplicant.findById(id).exec();

  if (!applicant) {
    return res.status(400).json({ message: "applicant not found" });
  }

  //check duplicate
  const duplicate = await UndergraduteApplicant.findOne({ email })
    .lean()
    .exec();
  //allow   original applicant
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  applicant.firstName = firstName;
  applicant.lastName = lastName;
  applicant.email = email;
  applicant.residence = residence;
  applicant.recentSchool = recentSchool;
  applicant.applicationStatus = applicationStatus;
  applicant.role = role;
  applicant.gender = gender;
  applicant.phone = phone;
  applicant.currentUniversity = currentUniversity;
  applicant.yearOfCompletion = yearOfCompletion;
  applicant.wassceText = wassceText;
  applicant.essayQuestion = essayQuestion;
  applicant.essayAnswer = essayAnswer;

  const updatedApplicant = await applicant.save();
  res.json({ message: `${updatedApplicant.firstName} updated succesfully` });
});

module.exports = {
  getAllUndergraduateApplicants,
  addNewApplicant,
  updateApplicant,
};
