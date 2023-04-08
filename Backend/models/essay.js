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

module.exports = mongoose.model("Essay", essaySchema);
