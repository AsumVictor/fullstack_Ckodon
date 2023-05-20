const User = require("../models/undergrad_student");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password")
    .lean()
    .sort({ createdAt: -1 });

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

const getSpecificUndergrad = asyncHandler(async (req, res) => {
 
  const { id } = req.params;
  const user = await User.findById(id)
    .select("-password")
    .lean()
  // If no users
  if (!user) {
    return res.status(400).json({ message: "No user found", isEmpty: true });
  }

  return res.json(user);
});


//create new user
const addNewUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    residence,
    role,
    school,
    password,
    isActive,
    phone,
    gender,
    avatar,
    keyInterest,
    bio,
    intendedMajor,
    updatedStatus,
  } = req.body;

  const anyEmptyField =
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !role ||
    !school ||
    !password ||
    !gender ||
    typeof updatedStatus !== 'boolean' ||
    typeof isActive !== "boolean";

  if (anyEmptyField) {
    return res.status(400).json({ message: "all fileds are required" });
  }

  //check for duplicats
  const duplicate = await User.findOne({ email }).lean().exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems this email aleady exist" });
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, 10); // salt rounds
  const userObject = {
    firstName,
    lastName,
    email,
    residence,
    role,
    school,
    password: hashPassword,
    gender,
    phone,
    avatar,
    keyInterest,
    bio,
    intendedMajor,
    updatedStatus,
  };

  //create and store new user
  const user = await User.create(userObject);
  if (user) {
    res
      .status(201)
      .json({ message: `${firstName} ${lastName} has been added successfuly` });
  } else {
    res.status(400).json({ message: `Invalid user data recieved` });
  }
});

//update a user
const updateUser = asyncHandler(async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    residence,
    role,
    school,
    oldPassword,
    newPassword,
    isActive,
    gender,
    phone,
    avatar,
    keyInterest,
    bio,
    intendedMajor,
    updatedStatus,
  } = req.body;
  const anyEmptyField =
    !id ||
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !school ||
    typeof isActive !== "boolean" ||
    typeof updatedStatus !== 'boolean'

  if (anyEmptyField) {
    return res.status(400).json({ message: "You must filled the form" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check duplicate
  const duplicate = await User.findOne({ email }).lean().exec();
  //allow   original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.residence = residence;
  user.school = school;
  user.isActive = isActive;
  user.role = role;
  user.gender = gender;
  user.phone = phone;
  user.avatar = avatar;
  user.keyInterest = keyInterest;
  user.bio = bio;
  user.intendedMajor = intendedMajor;
  user.updatedStatus = updatedStatus;
  if (newPassword && oldPassword) {
    //hash
    const passMath = await bcrypt.compare(oldPassword, user.password);
   if(!passMath){
    return res.status(409).json({ message: "Your old password doesn't match" });
   }
    user.password = await bcrypt.hash(newPassword, 10); // salt rounds
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.firstName} updated succesfully`, isSuccess: true });
});

//delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();
  const reply = `${result.firstName} has been deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
  getSpecificUndergrad
};
