const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({ message: "No user found" });
  }
  res.json(users);
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
  } = req.body;

  const anyEmptyField =
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !role ||
    !school ||
    !password;

  if (anyEmptyField) {
    return res.status(400).json({ message: "You can fill all the fields" });
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
  };

  //create and store new user
  const user = await User.create(userObject);
  if (user) {
    res
      .status(201)
      .json({ message: `user student ${firstName} ${lastName} successfuly` });
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
    password,
    isActive,
  } = req.body;

  const anyEmptyField =
    !id ||
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !role ||
    !school ||
    !password ||
    !isActive;

  if (anyEmptyField) {
    return res.status(400).json({ message: "You can fill all the fields" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not find" });
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

  if (password) {
    //hash
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();
  res.json({ message: `${updatedUser.firstName} updated succesfully` });
});

//delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body
    if(!id) {
        res.status(400).json({message: 'User ID required'})
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({message: 'User not found'})
    }

    const result = await user.deleteOne()
    const reply = `${result.firstName} has been deleted`

    res.json(reply)

});

module.exports = {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
};
