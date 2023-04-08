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
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    submitted: {
      type: Boolean,
      default: false,
    },

    aids: [
      {
        SchoolName: {
          type: String,
          required: false,
        },
        comment: {
          type: String,
          required: false,
        },
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
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Aid", aidSchema);
