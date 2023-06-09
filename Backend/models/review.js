const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    deadline: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      default: "unresolved",
      enum: ["unresolved", "resolved"],
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel",
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Honor", "Activity", "Aid", "Essay", "Recommendation"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
