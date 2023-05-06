const File = require("../models/files");
const asyncHandler = require("express-async-handler");

//get all files
const getFiles = asyncHandler(async (req, res) => {
  const file = await File.find().lean().sort({ updatedAt: -1 });

  res.status(200).json(file);
});

const addNewFile = asyncHandler(async (req, res) => {
  const { fileType, fileContent, fileTag } = req.body;

  // Confirm data

  const anyEmptyField =
    !fileType ||
    !fileContent || !fileTag


  if (anyEmptyField) {
    return res.status(400).json({ message: "All fields are required" });
  }


  const duplicate = await File.findOne({ fileType, fileContent, fileTag }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "You have already posted this file" });
  }

  // Create and store the new file

  const file = await File.create({
    fileType, fileContent, fileTag
  });

  if (file) {
    // Created
    return res
      .status(201)
      .json({ message: "You have posted the file successfully", isSuccess: true });
  } else {
    return res.status(400).json({ message: "Invalid data received" });
  }
});

// const updateFile = asyncHandler(async (req, res) => {
//   const { id,fileType, fileContent, fileTag } = req.body;

//   const anyEmptyField =
//     !status ||
//     !typeof submitted == "boolean" ||
//     !Array.isArray(files) ||
//     !typeof submittedBefore == "boolean";

//   if (anyEmptyField) {
//     return res.status(400).json({ message: "All field must be completed" });
//   }

//   const file = await File.findById(id).exec();

//   if (!file) {
//     return res.status(400).json({ message: "File not found" });
//   }

//   //check duplicate
//   const duplicate = await File.findOne({ id }).lean().exec();
//   //allow   original applicant
//   if (duplicate && duplicate?._id.toString() !== id) {
//     return res.status(409).json({ message: "File already exist" });
//   }
//   file.status = status;
//   file.submitted = submitted;
//   file.files = files;
//   file.submittedBefore = submittedBefore;

//   const updatedFile = await file.save();
//   if (updatedFile) {
//     res
//       .status(200)
//       .json({ message: `file updated succesfully`, isSuccess: true });
//   } else {
//     res.json({ message: `failed to update` });
//   }
// });

// const deleteFile = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   if (!id) {
//     res.status(400).json({ message: "File ID required" });
//   }

//   const file = await File.findById(id).exec();
//   if (!file) {
//     return res.status(400).json({ message: "File not found" });
//   }

//   const result = await file.deleteOne();
//   const reply = `File has been deleted`;

//   res.json(reply);
// });

module.exports = {
  getFiles,
  addNewFile,
};
