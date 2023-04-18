const mongoose = require("mongoose");

const honorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["resolved", "unresolved"],
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
          type: Date,
          required: false,
        },
      },
    ],

    honors: [
      {
        honorTitle: {
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
        isRecognisedInSchool: {
          type: Boolean,
          default: false,
        },
        isRecognisedInState: {
          type: Boolean,
          default: false,
        },
        isRecognisedNational: {
          type: Boolean,
          default: false,
        },
        isRecognisedInternational: {
          type: Boolean,
          default: false,
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
          enum: ["bad", "normal", "good", "notRated"],
          default: "notRated",
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Honor", honorSchema);
