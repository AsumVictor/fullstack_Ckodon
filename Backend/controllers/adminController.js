const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//get all admins
const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find()
    .select("-password")
    .lean()
    .sort({ updatedAt: -1 });

  // If no admins
  if (!admins?.length) {
    return res.status(400).json({ message: "No admins found" });
  }

  res.json(admins);
});

//create new admin
const addNewAdmin = asyncHandler(async (req, res) => {
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
    typeof isActive !== "boolean";

  if (anyEmptyField) {
    return res.status(400).json({ message: "all fileds are required" });
  }

  //check for duplicats
  const duplicate = await Admin.findOne({ email }).lean().exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems this email aleady exist" });
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, 10); // salt rounds
  const adminObject = {
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
  };

  //create and store new admin
  const admin = await Admin.create(adminObject);
  if (admin) {
    res
      .status(201)
      .json({ message: `${firstName} ${lastName} has been added successfuly` });
  } else {
    res.status(400).json({ message: `Invalid admin data recieved` });
  }
});

//update a admin
const updateAdmin = asyncHandler(async (req, res) => {
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
    gender,
    phone,
    avatar,
  } = req.body;

  const anyEmptyField =
    !id ||
    !firstName ||
    !lastName ||
    !email ||
    !residence ||
    !school ||
    !isActive;

  if (anyEmptyField) {
    return res.status(400).json({ message: "You must filled the form" });
  }

  const admin = await Admin.findById(id).exec();

  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  //check duplicate
  const duplicate = await Admin.findOne({ email }).lean().exec();
  //allow   original admin
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  admin.firstName = firstName;
  admin.lastName = lastName;
  admin.email = email;
  admin.residence = residence;
  admin.school = school;
  admin.isActive = isActive;
  admin.role = role;
  admin.gender = gender;
  admin.phone = phone;
  admin.avatar = avatar;
  if (password) {
    //hash
    admin.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedAdmin = await admin.save();
  res.json({ message: `${updatedAdmin.firstName} updated succesfully` });
});

//delete a admin
const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "Admin ID required" });
  }

  const admin = await Admin.findById(id).exec();
  if (!admin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const result = await admin.deleteOne();
  const reply = `${result.firstName} has been deleted`;

  res.json(reply);
});

module.exports = {
  getAllAdmins,
  addNewAdmin,
  updateAdmin,
  deleteAdmin,
};
