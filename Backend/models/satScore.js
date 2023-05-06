const mongoose = require("mongoose");

const satSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    date: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    totalScore: {
      type: String,
      required: true,
    },
    reading: {
      type: String,
      required: true,
    },
    math: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sat", satSchema);
