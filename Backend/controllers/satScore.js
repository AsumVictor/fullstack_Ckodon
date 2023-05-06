const Sat = require("../models/satScore");
const User = require("../models/undergrad_student");
const asyncHandler = require("express-async-handler");

//get all users
const getSats = asyncHandler(async (req, res) => {
  const sat = await Sat.find().lean().sort({ updatedAt: -1 });
  // If no undergradute Applicant
  if (!sat?.length) {
    return res.status(400).json({ message: "No sats found", isEmpty: true, });
  }
  res.status(200).json(sat);
});

const addNewSat = asyncHandler(async (req, res) => {
  const { user, date, state, totalScore, reading, math } = req.body;

  // Confirm data

  const anyEmptyField =
    !user || !date || !state || !totalScore || !reading || !math
  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required before you can create sat" });
  }

  //Check if user exist

  const student = await User.findById(user).lean().exec();
  if (!student) {
    return res.status(400).json({ message: "user not found" });
  }
  // Check for duplicate title



  // Create and store the new user

  const sat = await Sat.create({
    user, date, state, totalScore, reading, math
  });

  if (sat) {
    // Created
    return res.status(201).json({ message: "Sat created successfully", isSuccess: true,});
  } else {
    return res.status(400).json({ message: "Invalid applicant data received" });
  }
});

const updateSat = asyncHandler(async (req, res) => { 
  const { id, date, state, totalScore,  reading, math } = req.body;

  const anyEmptyField = !id || !date || !state || !totalScore ||  !reading || !math

  if (anyEmptyField) {
    return res.status(400).json({ message: "All field must be completed" });
  }

  const sat = await Sat.findById(id).exec();

  if (!sat) {
    return res.status(400).json({ message: "Sat not found" });
  }


  sat.date = date;
  sat.state = state;
  sat.totalScore =totalScore;
  sat.reading =reading, 
  sat.math =math 


  const updatedSat = await sat.save();
  if (updatedSat) {
    res.json({ message: `sat updated succesfully`, isSuccess: true });
  }else{
    res.json({ message: `failed to update` });

  }
});

const deleteSat = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({ message: "Sat ID required" });
  }

  const sat = await Sat.findById(id).exec();
  if (!sat) {
    return res.status(400).json({ message: "Sat not found" });
  }

  const result = await sat.deleteOne();
  const reply = `Sat has been deleted`;

  res.json(reply);
});


const getStudentSat = asyncHandler(async (req, res) => {
    const { userId} = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    //Check if user exist
  
    const student = await User.findById(user).lean().exec();
    if (!student) {
      return res.status(400).json({ message: "user not found" });
    }
    // Check for duplicate title
  
  
  
    // Create and store the new user
  
    const sat = await Sat.create({
      user, date, state, totalScore, reading, math
    });
  
    if (sat) {
      // Created
      return res.status(201).json({ message: "Sat created successfully", isSuccess: true,});
    } else {
      return res.status(400).json({ message: "Invalid applicant data received" });
    }
  });
  


module.exports = {
  getSats,
  addNewSat,
  updateSat,
  deleteSat,
};
