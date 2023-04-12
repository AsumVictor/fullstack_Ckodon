const Aid = require("../models/aid");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//get all users
const getAids = asyncHandler(async (req, res) => {
  const aid = await Aid.find().lean().sort({ createdAt: -1 });
  // If no undergradute Applicant
  if (!aid?.length) {
    return res.status(400).json({ message: "No aids found" });
  }
  res.json(aid);
});

const addNewAid = asyncHandler(async (req, res) => {
  const { user, status, submitted, aids } = req.body;

  // Confirm data

  const anyEmptyField =
    !user || !status || !typeof submitted == "boolean" || !Array.isArray(aids);

  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist

  const student = await User.findById(user).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "user not found" });
  }
  // Check for duplicate title

  const duplicate = await Aid.findOne({ user: user }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems you have already created an aid" });
  }

  // Create and store the new user

  const aid = await Aid.create({
    user,
    status,
    submitted,
    aids,
  });

  if (aid) {
    // Created
    return res.status(201).json({ message: "Aid created successfully" });
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

const updateAid = asyncHandler(async (req, res) => {
  const { id, status, submitted, aids } = req.body;

  const anyEmptyField = !status || !typeof submitted == "boolean" || !Array.isArray(aids);

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const aid = await Aid.findById(id).exec();

  if (!aid) {
    return res.status(400).json({ message: "Aid not found" });
  }

  //check duplicate
  const duplicate = await Aid.findOne({ id }).lean().exec();
  //allow   original applicant
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Aid already exist" });
  }
  aid.status = status;
  aid.submitted = submitted;
  aid.aids = aids;

  const updatedAid = await aid.save();
  if (updatedAid) {
    res.json({ message: `aid updated succesfully` });
  }else{
    res.json({ message: `failed to update` });

  }
});

const deleteAid = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "Aid ID required" });
  }

  const aid = await Aid.findById(id).exec();
  if (!aid) {
    return res.status(400).json({ message: "Aid not found" });
  }

  const result = await aid.deleteOne();
  const reply = `Aid has been deleted`;

  res.json(reply);
});

module.exports = {
  getAids,
  addNewAid,
  updateAid,
  deleteAid,
};
