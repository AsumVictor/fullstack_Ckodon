const Activity = require("../models/activity");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//get all users
const getActivities = asyncHandler(async (req, res) => {
  const activity = await Activity.find().lean().sort({ createdAt: -1 });
  // If no undergradute Applicant
  if (!activity?.length) {
    return res.status(400).json({ message: "No activities found" });
  }
  res.json(activity);
});

const addNewActivity = asyncHandler(async (req, res) => {
  const { user, status, submitted, activities } = req.body;

  // Confirm data

  const anyEmptyField =
    !user || !status || !submitted || !Array.isArray(activities);


  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if user exist

  const student = await User.findById(user).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "user not found" });
  }
  // Check for duplicate title

  const duplicate = await Activity.findOne({ user: user }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems you have already created an activity" });
  }

  // Create and store the new user

  const activity = await Activity.create({
    user,
    status,
    submitted,
    activities,
  });

  if (activity) {
    // Created
    return res.status(201).json({ message: "Activity created successfully" });
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

const updateActivity = asyncHandler(async (req, res) => {
  const { id, status, submitted, activities } = req.body;

  const anyEmptyField = !status || !submitted || !Array.isArray(activities);

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const activity = await Activity.findById(id).exec();

  if (!activity) {
    return res.status(400).json({ message: "Activity not found" });
  }

  //check duplicate
  const duplicate = await Activity.findOne({ id }).lean().exec();
  //allow   original applicant
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Activity already exist" });
  }
  activity.status = status;
  activity.submitted = submitted;
  activity.activities = activities;

  const updatedActivity = await activity.save();
  if (updatedActivity) {
    res.json({ message: `activity updated succesfully` });
  }else{
    res.json({ message: `failed to update` });

  }
});

const deleteActivity = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "Activity ID required" });
  }

  const activity = await Activity.findById(id).exec();
  if (!activity) {
    return res.status(400).json({ message: "Activity not found" });
  }

  const result = await activity.deleteOne();
  const reply = `Activity has been deleted`;

  res.json(reply);
});

module.exports = {
  getActivities,
  addNewActivity,
  updateActivity,
  deleteActivity,
};
