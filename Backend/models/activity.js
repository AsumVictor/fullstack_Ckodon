const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    submitted: {
      type: Boolean,
      default: false,
    },

    activities: [
      {
        type: {
          type: String,
          required: true,
        },
        position: {
          type: String,
          required: false,
        },
        organisationName: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        didItInGrade9: {
          type: Boolean,
          default: false,
        },
        didItInGrade10: {
          type: Boolean,
          default: false,
        },
        didItInGrade11: {
          type: Boolean,
          default: false,
        },
        didItInGrade12: {
          type: Boolean,
          default: false,
        },
        didItAfterSchool: {
          type: Boolean,
          default: false,
        },
        participstedInSchoolDay: {
          type: Boolean,
          default: false,
        },
        participstedInSchoolBreak: {
          type: Boolean,
          default: false,
        },
        participstedAllYear: {
          type: Boolean,
          default: false,
        },
        hourSpentPerYear: {
          type: String,
          required: false,
        },
        weeksSpentPerYear: {
          type: String,
          required: false,
        },
        comment: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);
