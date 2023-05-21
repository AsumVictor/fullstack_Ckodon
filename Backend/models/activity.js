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
      enum: ["resolved", "unresolved", ],
      default: "unresolved",
    },

    submitted: {
      type: Boolean,
      default: false,
    },
    submittedBefore: {
      type: Boolean,
      default: false,
    },
    voiceNOtes: [
      {
        voiceNote: {
          type: String,
          required: false,
        },
        timeDate: {
          type: Date,
          required: false,
        },
      },
    ],
    additionalDocs: [
      {
        doc: {
          type: String,
          required: false,
        },
        timeDate: {
          type: String,
          required: false,
        },
      },
      {
        timestamps: true,
      }
    ],
    activities: [
      {

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
        comments: [
          {
            comment: {
              type: String,
              required: false,
            },
            timeDate: {
              type: Date,
              required: false,
            },
          },
        ],
        rate: {
          type: String,
          enum: ['bad', 'normal', 'good', 'notRated'],
          default: 'notRated'
        },
        submittedBefore: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);
