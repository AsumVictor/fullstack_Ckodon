const mongoose = require("mongoose");

const essaySchema = new mongoose.Schema(
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
    schoolName: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: false,
    },

    essays: [
      {
        question: {
          type: String,
          required: false,
        },

        answer: {
          type: String,
          required: false,
        },

        answerPdf: {
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
            title: {
              type: String,
              required: false,
            },
          },
          {
            timestamps: true,
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

module.exports = mongoose.model("Essay", essaySchema);
