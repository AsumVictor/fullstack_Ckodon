const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    fileType: {
      type: String,
      enum: ["video", "image", "pdf"],
      required: true,
    },
    fileContent: {
        type: String,
        required: true,
      },
      fileTag: {
        type: String,
        required: true,
      },


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", fileSchema);
