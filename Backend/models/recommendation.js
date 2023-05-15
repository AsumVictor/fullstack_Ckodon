const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
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
    recommendations: [
      {
        recommenderName: {
          type: String,
          required: false,
        },
        link: {
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
              type: String,
              required: false,
            },
          },
          {
            timestamps: true,
          }
        ],
        letters: [
          {
            letter: { type: String, required: false },
            rate: {
              type: String,
              enum: ["bad", "normal", "good", "notRated"],
              default: "notRated",
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
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
