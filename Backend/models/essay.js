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
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    submitted: {
      type: Boolean,
      default: false,
    },
    schoolName: {
      type: String,
      required: true,
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
            timeDate: {
              type: Date,
              required: false,
            },
          },
        ],
        rate: {
          type: String,
          enum: ["bad", "normal","good", "notRated"],
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
