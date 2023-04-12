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
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    submitted: {
      type: Boolean,
      default: false,
    },

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

module.exports = mongoose.model("Honor", honorSchema);
