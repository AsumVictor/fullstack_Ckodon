const mongoose = require("mongoose");

const aidSchema = new mongoose.Schema(
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
    submittedBefore:{
      type: Boolean,
      default: false,
    },
    aids: [
      {
        SchoolName: {
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
        totalAnnualIncome: {
          type: String,
          required: false,
        },
        familySaving: {
          type: String,
          required: false,
        },
        totalExpensePerYear: {
          type: String,
          required: false,
        },
        EFC: {
          type: String,
          required: false,
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
        rate: {
          type: String,
          enum: ['approved', 'rejected','notRated'],
          default: 'notRated',
          required: false,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Aid", aidSchema);
