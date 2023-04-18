const Honor = require("../models/honor");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//get all users
const getHonors = asyncHandler(async (req, res) => {
  const honor = await Honor.find().lean().sort({ createdAt: -1 });
  // If no undergradute Applicant
  if (!honor?.length) {
    return res.status(400).json({ message: "No honors found" });
  }
  res.json(honor);
});

const addNewHonor = asyncHandler(async (req, res) => {
  const { user, status, submitted, honors, voiceNOtes, additionalDocs, submittedBefore } = req.body;

  // Confirm data

  const anyEmptyField =
    !user || !status || !typeof submitted == "boolean"  || !Array.isArray(honors)  || !Array.isArray(voiceNOtes)  || !Array.isArray(additionalDocs);

  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required before you can create honor" });
  }

  //Check if user exist

  const student = await User.findById(user).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "user not found" });
  }
  // Check for duplicate title

  const duplicate = await Honor.findOne({ user: user }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems you have already created an honor" });
  }

  // Create and store the new user

  const honor = await Honor.create({
    user,
    status,
    submitted,
    honors,
    voiceNOtes, 
    additionalDocs, 
    submittedBefore
  });

  if (honor) {
    // Created
    return res.status(201).json({ message: "Honor created successfully" });
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

const updateHonor = asyncHandler(async (req, res) => {
  const { id, status, submitted, honors,  voiceNOtes, additionalDocs, submittedBefore } = req.body;

  const anyEmptyField = !status || !typeof submitted == "boolean" || !Array.isArray(honors) || !typeof submittedBefore == "boolean"

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const honor = await Honor.findById(id).exec();

  if (!honor) {
    return res.status(400).json({ message: "Honor not found" });
  }

  //check duplicate
  const duplicate = await Honor.findOne({ id }).lean().exec();
  //allow   original applicant
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Honor already exist" });
  }
  honor.status = status;
  honor.submitted = submitted;
  honor.honors = honors;
  honor.submittedBefore =submittedBefore;
  honor.voiceNOtes =voiceNOtes, 
  honor.additionalDocs =additionalDocs 


  const updatedHonor = await honor.save();
  if (updatedHonor) {
    res.json({ message: `honor updated succesfully` });
  }else{
    res.json({ message: `failed to update` });

  }
});

const deleteHonor = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "Honor ID required" });
  }

  const honor = await Honor.findById(id).exec();
  if (!honor) {
    return res.status(400).json({ message: "Honor not found" });
  }

  const result = await honor.deleteOne();
  const reply = `Honor has been deleted`;

  res.json(reply);
});

module.exports = {
  getHonors,
  addNewHonor,
  updateHonor,
  deleteHonor,
};
