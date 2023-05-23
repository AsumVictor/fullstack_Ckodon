const Mentor = require("../models/mentorsModel");
const Student = require("../models/undergrad_student");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

//asign mentor 
//list all metors students
//list all student mentors
//get specific mentor with students

//get all mentors
const getAllMentors = asyncHandler(async (req, res) => {
  const mentors = await Mentor.find()
    .select("-password")
    .lean()
    .sort({ updatedAt: -1 });

  // If no mentors
  if (!mentors?.length) {
    return res.status(400).json({ message: "No mentors found" });
  }

  res.json(mentors);
});

//create new mentor
const addNewMentor = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    residence,
    students,
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
    typeof isActive !== "boolean" || 
    !Array.isArray(students)

  if (anyEmptyField) {
    return res.status(400).json({ message: "all fileds are required" });
  }

  //check for duplicats
  const duplicate = await Mentor.findOne({ email }).lean().exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "It seems this email aleady exist" });
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, 10); // salt rounds
  const mentorObject = {
    firstName,
    lastName,
    email,
    residence,
    students,
    role,
    school,
    password: hashPassword,
    gender,
    phone,
    avatar,
  };

  //create and store new mentor
  const mentor = await Mentor.create(mentorObject);
  if (mentor) {
    res
      .status(201)
      .json({ message: `${firstName} ${lastName} has been added successfuly`, isSuccess:true });
  } else {
    res.status(400).json({ message: `Invalid mentor data recieved` });
  }
});

//update a mentor
const updateMentor = asyncHandler(async (req, res) => {
  const {
    id,
    firstName,
    lastName,
    email,
    residence,
    students,
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
    !isActive ||
    !Array.isArray(students)


  if (anyEmptyField) {
    return res.status(400).json({ message: "You must filled the form" });
  }

  const mentor = await Mentor.findById(id).exec();

  if (!mentor) {
    return res.status(400).json({ message: "Mentor not found" });
  }

  //check duplicate
  const duplicate = await Mentor.findOne({ email }).lean().exec();
  //allow   original mentor
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  mentor.firstName = firstName;
  mentor.lastName = lastName;
  mentor.email = email;
  mentor.residence = residence;
  mentor.school = school;
  mentor.isActive = isActive;
  mentor.role = role;
  mentor.gender = gender;
  mentor.phone = phone;
  mentor.avatar = avatar;
  mentor.students = students
  if (password) {
    //hash
    mentor.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedMentor = await mentor.save();
  res.json({ message: `${updatedMentor.firstName} updated succesfully`, isSuccess: true, });
});

//delete a mentor
const deleteMentor = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "Mentor ID required" });
  }

  const mentor = await Mentor.findById(id).exec();
  if (!mentor) {
    return res.status(400).json({ message: "Mentor not found" });
  }

  const result = await mentor.deleteOne();
  const reply = `${result.firstName} has been deleted`;

  res.json(reply);
});


const getSpecificMentor = asyncHandler(async (req, res) => {
 
  const { id } = req.params;
  const mentor = await Mentor.findById(id)
    .select("-password")
    .lean()
  // If no mentors
  if (!mentor) {
    return res.status(400).json({ message: "No mentor found", isEmpty: true });
  }
const mentees = []
  const mentorWithStudents = await Promise.all(
    mentor.students.map(async (studentId) => {
      const student = await Student.findById(studentId)
        .select("-password")
        .lean()
        .exec();

        if (!student) {
          return res.status(404).json({ error: "student not found" });
        }

        mentees.push(student)
    
    })
  );
  return res.json({...mentor, mentees: mentees});
 
});


const asignMentorMentee = asyncHandler(async (req, res) => {
 
  const {
    mentorId,
    studentId,
  } = req.body;


  if (!mentorId || !studentId ) {
    return res.status(400).json({ message: "You must filled the form" });
  }

  const mentor = await Mentor.findById(mentorId).exec();

  if (!mentor) {
    return res.status(400).json({ message: "Mentor not found" });
  }

  const student = await Student.findById(studentId).exec();
  if (!student) {
    return res.status(400).json({ message: "student not found" });
  }


let currentStudent = mentor.students
let currentMentor = student.mentors
let alreadyAsignStudent = currentStudent.includes(studentId)
let alreadyAsignMentor = currentMentor.includes(mentorId)
if(alreadyAsignStudent || alreadyAsignMentor){
  return res.status(409).json({ message: "It seems you have already asign this student to the mentor" });
}
 currentStudent.push(studentId)
 currentMentor.push(mentorId)

   mentor.students = currentStudent
   student.mentors = currentMentor

  const updatedMentor = await mentor.save();
  const updatedStudent = await student.save();
  if(updatedMentor && updatedStudent){

    res.json({ message: `You have succcessfully asign ${student.firstName} to mentor ${mentor.firstName} ${mentor.lastName}`, isSuccess: true, });
  }else{
    return resres.status(400).json({ message: `Invalid data input`, isSuccess: false, });
  }


 
});




module.exports = {
  getAllMentors,
  addNewMentor,
  updateMentor,
  deleteMentor,
  getSpecificMentor,
  asignMentorMentee
};
