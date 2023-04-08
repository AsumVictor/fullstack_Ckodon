const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['pending', 'rejected', 'approved']
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
    timestamp: true,
  }
);



module.exports = mongoose.model("Review", reviewSchema);
