

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
    },
    recentSchool: {
      type: String,
      required: true,
    },

    applicationStatus: {
      type: String,
      default: "not reviewed",
    },
    dateOfBirth: {
      type: Date,
      require: true,
    },
    currentUniversity: {
      type: String,
      require: true,
    },
    yearOfCompletion: {
      type: Date,
      require: true,
    },
    wassceText: {
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
    gender:{
      type: String,
      require: true,
    },
    phone:{
      type: String,
      require: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UndergraduteApplicantSchema", undergraduteApplicantSchema);
