

const mongoose = require("mongoose");

const undergraduteApplicantSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    residence: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "undergraduate",
      required: true,
    },
    recentSchool: {
      type: String,
      required: true,
    },

    applicationStatus: {
      type: String,
      default: "pending",
    },
    dateOfBirth: {
      type: String,
      require: true,
    },
    currentUniversity: {
      type: String,
      require: false,
    },
    yearOfCompletion: {
      type: String,
      require: true,
    },
    wassceText: {
      type: String,
      require: false,
    },
    wasscePdf: {
      type: String,
      require: false,
    },
    essayQuestion: {
      type: String,
      require: true,
    },
    essayAnswer: {
      type: String,
      require: true,
    },
    essayAnswerPdf: {
      type: String,
      require: true,
    },
    gender:{
      type: String,
      require: true,
    },
    phone:{
      type: String,
      require: false,
    },
    whatsappNumber:{
      type: String,
      required: false,
    },
    level:{
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UndergraduteApplicantSchema", undergraduteApplicantSchema);
